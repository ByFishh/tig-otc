// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;

import {Errors} from "../src/utils/Errors.sol";
import "./OTCTest.sol";
import { Ownable } from "solady/auth/Ownable.sol";

contract SetFees is OTCTest {
    function test_setFees_Normal() public {
        vm.prank(owner);
        otc.setFees(5_000);
    }

    function test_setFees_NotOwner() public {
        vm.expectRevert(Ownable.Unauthorized.selector);
        otc.setFees(5_000);
    }

    function test_setFees_Over10000() public {
        vm.expectRevert(Errors.InvalidFees.selector);
        vm.prank(owner);
        otc.setFees(10_001);
    }
}
