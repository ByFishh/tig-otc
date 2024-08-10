// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;

import {Test, console} from "forge-std/Test.sol";
import {OTC} from "../src/OTC.sol";
import {ERC20} from "solmate/tokens/ERC20.sol";

contract MockUSDC is ERC20 {
    constructor() ERC20("Mock USDC", "mUSDC", 6) {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract MockTIG is ERC20 {
    constructor() ERC20("Mock TIG", "mTIG", 18) {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract OTCTest is Test {
    OTC public otc;
    MockUSDC public usdc;
    MockTIG public tig;

    function setUp() public {
        usdc = new MockUSDC();
        tig = new MockTIG();

        usdc.mint(address(this), 10000 * 10 ** 6);
        tig.mint(address(this), 10000 * 10 ** 18);

        otc = new OTC(address(usdc), address(tig));
    }

    function test_createOffer() public {
        assertEq(otc.totalOffers(), 0);

        usdc.approve(address(otc), 1000 * 10 ** 6);
        tig.approve(address(otc), 200 * 10 ** 18);

        otc.createOffer(
            OTC.OfferType.Buy,
            address(usdc),
            100 * 10 ** 6,
            address(tig),
            20 * 10 ** 18
        );
        assertEq(otc.totalOffers(), 1);
    }

    
}
