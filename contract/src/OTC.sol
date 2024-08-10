// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;

import {Errors} from "./utils/Errors.sol";
import {ReentrancyGuard} from "solmate/utils/ReentrancyGuard.sol";
import {Ownable} from "solady/auth/Ownable.sol";
import {ERC20} from "solady/tokens/ERC20.sol";
import {SafeTransferLib} from "solady/utils/SafeTransferLib.sol";

/// @author ByFish
/// @title OTC
/// @notice Over-the-counter trading contract
contract OTC is ReentrancyGuard, Ownable {
    using SafeTransferLib for ERC20;

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    /**
     *  @notice Event emitted when a new offer is created
     */
    event CreateOffer(
        address creator,
        address inToken,
        uint256 inAmount,
        address outToken,
        uint256 outAmount
    );

    /**
     *  @notice Event emitted when an offer is cancelled
     */
    event CancelOffer(uint256 offerId);

    /**
     *  @notice Event emitted when an offer is filled
     */
    event FillOffer(uint256 offerId);

    /*//////////////////////////////////////////////////////////////
                                TYPES
    //////////////////////////////////////////////////////////////*/

    /**
     *  @notice Offer type
     */
    enum OfferType {
        Buy,
        Sell
    }

    /**
     *  @notice Offer status
     */
    enum OfferStatus {
        Initialized,
        Completed,
        Cancelled
    }

    /**
     *  @notice Offer struct
     */
    struct Offer {
        address creator;
        OfferType offerType;
        OfferStatus offerStatus;
        address inToken;
        uint256 inAmount;
        address outToken;
        uint256 outAmount;
    }

    /*//////////////////////////////////////////////////////////////
                                VARIABLES
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Maximum fee bps
     */
    uint256 public constant MAX_FEE_BPS = 10000;

    /**
     * @notice Address of the USDC token
     */
    address public usdcAddress;

    /**
     * @notice Address of the TIG token
     */
    address public tigAddress;

    /**
     * @notice Fees bps
     */
    uint256 public fees;

    /**
     * @notice Address of the fees recipient
     */
    address public feesRecipient;

    /**
     * @notice Total number of offers
     */
    uint256 public totalOffers;

    /**
     * @notice Mapping of offerId to Offer
     */
    mapping(uint256 => Offer) public offers;

    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        address initialUsdc,
        address initialTig,
        uint256 initialFees,
        address initialOwner,
        address initialFeesRecipient
    ) {
        _initializeOwner(initialOwner);

        if (initialUsdc == address(0) || initialTig == address(0))
            revert Errors.ZeroAddress();
        if (initialFees > MAX_FEE_BPS) revert Errors.InvalidFees();

        usdcAddress = initialUsdc;
        tigAddress = initialTig;
        fees = initialFees;
        feesRecipient = initialFeesRecipient;
    }

    /*//////////////////////////////////////////////////////////////
                            ADMIN LOGIC
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Set the fees
     * @param newFees New fees
     * @custom:requires owner
     */
    function setFees(uint256 newFees) public onlyOwner {
        if (newFees > MAX_FEE_BPS) revert Errors.InvalidFees();
        fees = newFees;
    }

    /**
     * @notice Set the fees recipient
     * @param newFeesRecipient New fees recipient
     * @custom:requires owner
     */
    function setFeesRecipient(address newFeesRecipient) public onlyOwner {
        if (newFeesRecipient == address(0)) revert Errors.ZeroAddress();
        feesRecipient = newFeesRecipient;
    }

    /*//////////////////////////////////////////////////////////////
                            USER LOGIC
    //////////////////////////////////////////////////////////////*/

    /**
     * @notice Create a new offer to buy or sell tokens
     * @param offerType Offer type
     * @param inToken Input token
     * @param inAmount Input amount
     * @param outToken Output token
     * @param outAmount Output amount
     * @custom:nonreentrant
     */
    function createOffer(
        OfferType offerType,
        address inToken,
        uint256 inAmount,
        address outToken,
        uint256 outAmount
    ) public nonReentrant {
        if (inToken == address(0) || outToken == address(0))
            revert Errors.ZeroAddress();
        if (inToken == outToken) revert Errors.InvalitPair();
        if (inToken != tigAddress && inToken != usdcAddress)
            revert Errors.InvalidToken();
        if (outToken != tigAddress && outToken != usdcAddress)
            revert Errors.InvalidToken();

        SafeTransferLib.safeTransferFrom(
            inToken,
            msg.sender,
            address(this),
            inAmount
        );

        offers[totalOffers] = Offer(
            msg.sender,
            offerType,
            OfferStatus.Initialized,
            inToken,
            inAmount,
            outToken,
            outAmount
        );

        emit CreateOffer(msg.sender, inToken, inAmount, outToken, outAmount);

        ++totalOffers;
    }

    /**
     * @notice Cancel an offer by id
     * @param offerId Offer id
     * @custom:nonreentrant
     */
    function cancelOffer(uint256 offerId) public nonReentrant {
        Offer memory offer = offers[offerId];
        if (offer.creator != msg.sender) revert Errors.Unauthorized();
        if (offer.offerStatus != OfferStatus.Initialized)
            revert Errors.InvalidStatus();
        offers[offerId].offerStatus = OfferStatus.Cancelled;

        SafeTransferLib.safeTransfer(offer.inToken, msg.sender, offer.inAmount);

        emit CancelOffer(offerId);
    }

    /**
     * @notice Fill an offer by id
     * @param offerId Offer id
     * @custom:nonreentrant
     */
    function fillOffer(uint256 offerId) public nonReentrant {
        Offer memory offer = offers[offerId];
        if (offer.offerStatus != OfferStatus.Initialized)
            revert Errors.InvalidStatus();

        SafeTransferLib.safeTransfer(
            offer.inToken,
            msg.sender,
            offer.inAmount - (offer.inAmount * fees) / MAX_FEE_BPS
        );

        SafeTransferLib.safeTransfer(
            offer.inToken,
            feesRecipient,
            (offer.inAmount * fees) / MAX_FEE_BPS
        );

        SafeTransferLib.safeTransferFrom(
            offer.outToken,
            msg.sender,
            offer.creator,
            offer.outAmount
        );

        offers[offerId].offerStatus = OfferStatus.Completed;

        emit FillOffer(offerId);
    }

    /**
     * @notice Get all orders by status
     * @param offerStatus Offer status
     */
    function getOrders(
        OfferStatus offerStatus
    ) public view returns (Offer[] memory) {
        uint256 counter = 0;

        for (uint256 i = 0; i < totalOffers; i++) {
            if (offers[i].offerStatus == offerStatus) {
                counter += 1;
            }
        }

        Offer[] memory result = new Offer[](counter);

        for (uint256 i = 0; i < totalOffers; i++) {
            if (offers[i].offerStatus == offerStatus) {
                result[counter] = offers[i];
            }
        }
        return result;
    }
}
