// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;

import {Errors} from "../src/utils/Errors.sol";
import "./OTCTest.sol";

contract Constructor is OTCTest {
    function test_constructor_Normal() public view {
        assertEq(otc.totalOffers(), 0, "totalOffers should be 0");
        assertEq(otc.fees(), 5000, "fees should be 5000");
    }

    function test_constructor_ZeroAddressUSDC() public {
        vm.expectRevert(Errors.ZeroAddress.selector);
        new OTC(
            address(0),
            address(fakeTig),
            5000,
            address(this),
            address(this)
        );
    }

    function test_constructor_ZeroAddressTIG() public {
        vm.expectRevert(Errors.ZeroAddress.selector);
        new OTC(
            address(fakeUsdc),
            address(0),
            5000,
            address(this),
            address(this)
        );
    }

    function test_constructor_ZeroAddressOwner() public {
        vm.expectRevert(Errors.ZeroAddress.selector);
        new OTC(
            address(fakeUsdc),
            address(fakeTig),
            5000,
            address(0),
            address(this)
        );
    }

    function test_constructor_ZeroAddressFeeTo() public {
        vm.expectRevert(Errors.ZeroAddress.selector);
        new OTC(
            address(fakeUsdc),
            address(fakeTig),
            5000,
            address(this),
            address(0)
        );
    }

    function test_constructor_FeesOver10000() public {
        vm.expectRevert(Errors.InvalidFees.selector);
        new OTC(
            address(fakeUsdc),
            address(fakeTig),
            10001,
            address(this),
            address(this)
        );
    }
}
