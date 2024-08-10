// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;

import {Errors} from "../src/utils/Errors.sol";
import "./OTCTest.sol";
import { Ownable } from "solady/auth/Ownable.sol";

contract SetFeesRecipient is OTCTest {
    function test_setFeesRecipient_Normal() public {
        vm.prank(owner);
        otc.setFeesRecipient(address(this));
    }

    function test_setFees_NotOwner() public {
        vm.expectRevert(Ownable.Unauthorized.selector);
        otc.setFeesRecipient(address(this));
    }

    function test_setFeesRecipient_Over10000() public {
        vm.expectRevert(Errors.ZeroAddress.selector);
        vm.prank(owner);
        otc.setFeesRecipient(address(0));
    }
}
