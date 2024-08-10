//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library Errors {
    // General errors
    error ZeroValue();
    error ZeroAddress();
    error EmptyArray();
    error DifferentSizeArrays(uint256 length1, uint256 length2);

    error InvalidToken();
    error InvalitPair();
    error InvalidStatus();
    error InvalidFees();
    error Unauthorized();
}
