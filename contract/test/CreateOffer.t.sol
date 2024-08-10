// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;

import {Errors} from "../src/utils/Errors.sol";
import "./OTCTest.sol";
import {Ownable} from "solady/auth/Ownable.sol";

contract CreateOffer is OTCTest {
    function test_createOffer_BuyNormal() public {
        deal(usdc, alice, 10000000000000);
        vm.prank(alice);
        fakeUsdc.approve(address(otc), 10000000000000);
        vm.prank(alice);
        otc.createOffer(OTC.OfferType.Buy, 10000000000000, 1000000000);

        OTC.Offer[] memory offers = otc.getOrders(OTC.OfferStatus.Initialized);
        assertEq(otc.totalOffers(), 1);
        assertEq(offers[0].creator, alice);
        assertEq(uint8(offers[0].offerType), uint8(OTC.OfferType.Buy));
        assertEq(uint8(offers[0].offerStatus), uint8(OTC.OfferStatus.Initialized));
        assertEq(offers[0].inToken, usdc);
        assertEq(offers[0].inAmount, 10000000000000);
        assertEq(offers[0].outToken, tig);
        assertEq(offers[0].outAmount, 1000000000);
    }

    function test_createOffer_SellNormal() public {
        deal(tig, alice, 1000000000);
        vm.prank(alice);
        fakeTig.approve(address(otc), 1000000000);
        vm.prank(alice);
        otc.createOffer(OTC.OfferType.Sell, 1000000000, 10000000000000);

        (
            address creator,
            OTC.OfferType offerType,
            OTC.OfferStatus offerStatus,
            address tokenIn,
            uint256 amountIn,
            address tokenOut,
            uint256 amountOut
        ) = otc.offers(0);
        assertEq(otc.totalOffers(), 1);
        assertEq(creator, alice);
        assertEq(uint8(offerType), uint8(OTC.OfferType.Sell));
        assertEq(uint8(offerStatus), uint8(OTC.OfferStatus.Initialized));
        assertEq(tokenIn, tig);
        assertEq(amountIn, 1000000000);
        assertEq(tokenOut, usdc);
        assertEq(amountOut, 10000000000000);
    }

    function test_createOffer_InvalidInputAmount() public {
        vm.expectRevert(Errors.ZeroValue.selector);
        vm.prank(alice);
        otc.createOffer(OTC.OfferType.Sell, 0, 10000000000000);
    }

    function test_createOffer_InvalidOutputAmount() public {
        vm.expectRevert(Errors.ZeroValue.selector);
        vm.prank(alice);
        otc.createOffer(OTC.OfferType.Sell, 1000000000, 0);
    }
}
