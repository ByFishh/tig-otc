// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;

import {Errors} from "../src/utils/Errors.sol";
import "./OTCTest.sol";
import {Ownable} from "solady/auth/Ownable.sol";

contract CancelOffer is OTCTest {
    function test_cancelOffer_Normal() public {
        deal(usdc, alice, 10000000000000);
        vm.prank(alice);
        fakeUsdc.approve(address(otc), 10000000000000);
        vm.prank(alice);
        otc.createOffer(OTC.OfferType.Buy, 10000000000000, 1000000000);

        vm.prank(alice);
        fakeTig.approve(address(otc), 10000000000000);
        vm.prank(alice);
        otc.cancelOffer(0);

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
        assertEq(uint8(offerType), uint8(OTC.OfferType.Buy));
        assertEq(uint8(offerStatus), uint8(OTC.OfferStatus.Cancelled));
        assertEq(tokenIn, usdc);
        assertEq(amountIn, 10000000000000);
        assertEq(tokenOut, tig);
        assertEq(amountOut, 1000000000);
    }

    function test_cancelOffer_NotCreator() public {
        deal(usdc, alice, 10000000000000);
        vm.prank(alice);
        fakeUsdc.approve(address(otc), 10000000000000);
        vm.prank(alice);
        otc.createOffer(OTC.OfferType.Buy, 10000000000000, 1000000000);

        vm.expectRevert(Errors.Unauthorized.selector);
        vm.prank(bob);
        otc.cancelOffer(0);
    }

    function test_cancelOffer_Completed() public {
        deal(usdc, alice, 10000000000000);
        vm.prank(alice);
        fakeUsdc.approve(address(otc), 10000000000000);
        vm.prank(alice);
        otc.createOffer(OTC.OfferType.Buy, 10000000000000, 1000000000);

        // Fill the offer so it is completed
        deal(tig, bob, 1000000000);
        vm.prank(bob);
        fakeTig.approve(address(otc), 10000000000000);
        vm.prank(bob);
        otc.fillOffer(0);

        vm.expectRevert(Errors.InvalidStatus.selector);
        vm.prank(alice);
        otc.cancelOffer(0);
    }

    function test_cancelOffer_alreadyCancelled() public {
        deal(usdc, alice, 10000000000000);
        vm.prank(alice);
        fakeUsdc.approve(address(otc), 10000000000000);
        vm.prank(alice);
        otc.createOffer(OTC.OfferType.Buy, 10000000000000, 1000000000);

        // Fill the offer so it is completed
        vm.prank(alice);
        otc.cancelOffer(0);

        vm.expectRevert(Errors.InvalidStatus.selector);
        vm.prank(alice);
        otc.cancelOffer(0);
    }

    function test_createOffer_InvalidOfferId() public {
        vm.expectRevert(Errors.Unauthorized.selector);
        vm.prank(alice);
        otc.cancelOffer(10);
    }
}
