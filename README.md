# Sending BUSD Tokens with Wagmi and Web3modal on BSC Testnet

This is a sample README to guide you on how to send BUSD tokens to a user address using React, Web3modal, and Wagmi on the Binance Smart Chain (BSC) Testnet.

## React Front-end

The dapp was built with ReactJs, the Dapp was structured into separate components like ButtonFun and Wallet. The connection button is neatly housed by ButtonFun, enabling seamless financial interaction between the Dapp and Web3Modal. The user-friendly form in Wallet, on the other hand, makes it simple to do approval and transfer tasks. This Dapp's modular structure encourages effective code management and user interaction, which improves the overall experience of dealing with blockchain functionalities.

## Integration using ethers.js

The integration of the dapp was championed by Wagmi, Viem, and web3 Modal. Honestly, it was really funny. Firstly, integrated solely with etherJs and Metamask provider, unfortunately, it was working effectively on mobile, it only works on the browser. I switched to using Wagmi and Viem to help with the integration of the smart contract. With the react hooks from Wagmi, I was able to interact with the contract using the usePrepareContractWrite hook which I used to interact with the contracts. 

Another challenge I faced and was able to resolve is the code working offline and not working online. I notice that my usePrepareContractWrite is returning a config object with the request undefined I tried fixing it even when studying the codebase from node_modules/wagmi I still didn’t get a positive result, the only finding I discovered was abi, contract address and functionName are the what can make the request undefined if there are not correct. The functions with etherjs and Metamask provider are working perfectly both offline and online.

## Solidity Smart Contract

The Dapp has two contracts and one interface. The contracts are Token and Busd wallet contracts. 

The constructor is designed to initialize the contract with the address of the BEP-20 token (BUSD) it will be interacting with. The use of the IBEP20 interface contract helps maintain the code's efficiency and compatibility, as it ensures that the contract adheres to the BEP-20 token standard which has a similar standard to ERC20. 

Throughout the contract, input validation is emphasized. In the constructor, it's ensured that the provided _busdAddress is not an invalid address (address(0)). Similarly, in the sendToken function, it's required that both the recipient (to) and sender (msg.sender) addresses are valid.
The sendToken function facilitates the secure transfer of tokens from the sender to the recipient. The use of transferFrom from the BEP-20 interface ensures that the sender approves the contract to spend tokens on their behalf, mitigating unauthorized transfers.
The constructor's requirement of a valid BUSD token address prevents the contract from being deployed with a non-existent token, avoiding potential vulnerabilities. The explicit requirement for valid addresses prevents accidental token loss by prohibiting transfers to or from invalid addresses.

By using the transferFrom function to initiate token transfers, the contract reduces the risk of reentrancy attacks and conserves gas costs. This function is part of the BEP-20 standard, assuring compatibility with various wallets and dApps.
The contract's simplicity and direct use of the BEP-20 interface contribute to its efficiency. By minimizing unnecessary logic and adhering to established standards, gas consumption is kept low.

---

## Setup

1. Clone the repository

2. Install the required dependencies:

```bash
npm install
```

3. Deploy your contract to the BSC Testnet and obtain the contract address.
```bash
npx hardhat run --network bscTestnet scripts/deploy.js
```

