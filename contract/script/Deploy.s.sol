// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import "../src/OTC.sol";

contract DeployScript is Script {
    address constant usdc = 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913;
    address constant tig = 0x0C03Ce270B4826Ec62e7DD007f0B716068639F7B;

    uint256 fees;
    address feeRecipient;
    address owner;

    OTC otc;

    function setUp() public {
        fees = 50;
        feeRecipient = vm.envAddress("FEE_RECIPIENT");
        owner = vm.envAddress("OWNER");
    }

    function _deployOTC() internal {
        otc = new OTC(usdc, tig, fees, owner, feeRecipient);
        console.log("OTC deployed at:", address(otc));
    }

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.rememberKey(deployerPrivateKey);
        vm.startBroadcast(deployer);

        _deployOTC();

        vm.stopBroadcast();
    }
}
