// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "contracts/IBEP20.sol";

/**
 * @title BusdHandler
 * @author Uchechukwu Anthony (@sagetony224)
 * @dev A BUSD contract that handle transfer of BUSD.
 */

contract BusdHandler {
    IBEP20 public busdToken;

    constructor(address _busdAddress) {
        require(_busdAddress != address(0), "Invalid Address");
        busdToken = IBEP20(_busdAddress);
    }

    /**
     * @dev  tranfers token to the recipient.
     * @param to  recipient.
     * @param amount amount.
     */
    function sendToken(address to, uint256 amount) external {
        require(to != address(0), "Invalid Address");
        busdToken.transferFrom(msg.sender, to, amount);
    }
}
