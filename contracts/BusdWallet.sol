// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/IBEP20.sol";

contract BusdWallet {
    IBEP20 public busdToken;

    constructor(address _busdAddress) {
        require(_busdAddress != address(0), "Invalid Address");
        busdToken = IBEP20(_busdAddress);
    }

    function sendToken(address to, uint256 amount) external {
        require(to != address(0), "Invalid Address");
        busdToken.transferFrom(msg.sender, to, amount);
    }
}
