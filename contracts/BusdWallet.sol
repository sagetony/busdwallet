//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "contracts/IBEP20.sol";

contract BusdWallet {
    IBEP20 public busdToken;
    mapping(address => uint256) internal balances;

    event Transfer(address indexed to, address indexed from, uint256 amount);

    constructor(address _busdAddress) {
        busdToken = IBEP20(_busdAddress);   
    }

    function sendToken(address to, uint256 amount) external {
        require(to != address(0), "Invalid Address");
        require(amount <= balances[msg.sender], "Insufficent Fund");
        balances[msg.sender] -= amount;
        busdToken.transfer(to, amount);
        
        emit Transfer(to, msg.sender, amount);
    }

    function receiveToken(uint256 amount) external {
        busdToken.transferFrom(msg.sender, address(this), amount);
        balances[msg.sender] += amount;
        
        emit Transfer(address(this), msg.sender, amount);
    }

    function balanceToken(address client) public view returns (uint256) {
        return balances[client];
    }

    function getBUSDBalanceContract() external view returns (uint256) {
        return busdToken.balanceOf(address(this));
    }
    function getBUSDBalance(address client) external view returns (uint256) {
        return busdToken.balanceOf(client);
    }
}