// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import {OTC} from "../src/OTC.sol";
import {ERC20} from "solady/tokens/ERC20.sol";
import {ERC20Mock} from "./mock/ERC20.sol";

contract OTCTest is Test {
    OTC otc;
    address owner = makeAddr("owner");
    address feeRecipient = makeAddr("feeRecipient");
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");
    ERC20Mock fakeUsdc;
    ERC20Mock fakeTig;
    address usdc;
    address tig;

    function setUp() public {
        fakeUsdc = new ERC20Mock("USDC", "USDC", 6);
        fakeTig = new ERC20Mock("TIG", "TIG", 18);
        usdc = address(fakeUsdc);
        tig = address(fakeTig);

        // fakeUsdc.mint(address(this), 10000 * 10 ** 6);
        // fakeTig.mint(address(this), 10000 * 10 ** 18);

        otc = new OTC(
            address(fakeUsdc),
            address(fakeTig),
            5000,
            owner,
            feeRecipient
        );
    }
}
