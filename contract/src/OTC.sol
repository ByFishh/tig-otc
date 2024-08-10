/// SPDX-License-Identifier: GPL-3.0-or-later
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

    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    /**
     *  @notice Event emitted when a new offer is created
     */
    event OfferCreated(
        address indexed creator,
        uint256 offerId,
        OfferType offerType,
        uint256 inAmount,
        uint256 outAmount
    );

    /**
     *  @notice Event emitted when an offer is cancelled
     */
    event OfferCanceled(uint256 offerId);

    /**
     *  @notice Event emitted when an offer is filled
     */
    event OfferFilled(uint256 offerId);

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
    uint256 public constant MAX_BPS = 10_000;

    /**
     * @notice Address of the USDC token
     */
    address public immutable usdcAddress;

    /**
     * @notice Address of the TIG token
     */
    address public immutable tigAddress;

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
        if (initialFees > MAX_BPS) revert Errors.InvalidFees();
        if (initialOwner == address(0)) revert Errors.ZeroAddress();
        if (initialFeesRecipient == address(0)) revert Errors.ZeroAddress();

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
        if (newFees > MAX_BPS) revert Errors.InvalidFees();
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
     * @param inAmount Input amount
     * @param outAmount Output amount
     * @custom:nonreentrant
     */
    function createOffer(
        OfferType offerType,
        uint256 inAmount,
        uint256 outAmount
    ) public nonReentrant {
        address inToken = offerType == OfferType.Buy ? usdcAddress : tigAddress;
        address outToken = offerType == OfferType.Buy
            ? tigAddress
            : usdcAddress;

        if (offerType != OfferType.Buy && offerType != OfferType.Sell)
            revert Errors.InvalidOfferType();
        if (inAmount == 0 || outAmount == 0) revert Errors.ZeroValue();

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

        emit OfferCreated(
            msg.sender,
            totalOffers,
            offerType,
            inAmount,
            outAmount
        );

        ++totalOffers;
    }

    /**
     * @notice Cancel an offer by id
     * @param offerId Offer id
     * @custom:nonreentrant
     */
    function cancelOffer(uint256 offerId) public nonReentrant {
        Offer memory offer = offers[offerId];
        if (offer.creator != msg.sender) revert Errors.Unauthorized(); // Also checks if the period is invalid
        if (offer.offerStatus != OfferStatus.Initialized)
            revert Errors.InvalidStatus();
        offers[offerId].offerStatus = OfferStatus.Cancelled;

        SafeTransferLib.safeTransfer(offer.inToken, msg.sender, offer.inAmount);

        emit OfferCanceled(offerId);
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
        if (offer.creator == address(0)) revert Errors.InvalidOfferId();

        SafeTransferLib.safeTransfer(
            offer.inToken,
            msg.sender,
            offer.inAmount - (offer.inAmount * fees) / MAX_BPS
        );

        SafeTransferLib.safeTransfer(
            offer.inToken,
            feesRecipient,
            (offer.inAmount * fees) / MAX_BPS
        );

        SafeTransferLib.safeTransferFrom(
            offer.outToken,
            msg.sender,
            offer.creator,
            offer.outAmount
        );

        offers[offerId].offerStatus = OfferStatus.Completed;

        emit OfferFilled(offerId);
    }

    /**
     * @notice Get all offers by status
     * @param offerStatus Offer status
     */
    function getOffers(
        OfferStatus offerStatus
    ) public view returns (Offer[] memory) {
        uint256 counter = 0;

        for (uint256 i = 0; i < totalOffers; i++) {
            if (offers[i].offerStatus == offerStatus) {
                ++counter;
            }
        }

        Offer[] memory result = new Offer[](counter);
        counter = 0;

        for (uint256 i = 0; i < totalOffers; i++) {
            if (offers[i].offerStatus == offerStatus) {
                result[counter] = offers[i];
                ++counter;
            }
        }
        return result;
    }
}
