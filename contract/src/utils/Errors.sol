//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library Errors {
    error ZeroValue();
    error ZeroAddress();

    error InvalidFees();
    error InvalidOfferType();
    error InvalidOfferId();
    error InvalidStatus();

    error Unauthorized();
}
