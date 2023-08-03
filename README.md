# Sending BUSD Tokens with Wagmi on BSC Testnet

This is a sample README to guide you on how to send BUSD tokens to a user address using React, Web3modal, and Wagmi on the Binance Smart Chain (BSC) Testnet.

## Prerequisites

Before proceeding, make sure you have the following installed:

- Node.js and npm or yarn: [Install Node.js](https://nodejs.org/)
- React: [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)

## Setup

1. Clone the repository or create a new React project:

```bash
npx create-react-app wagmi-busd-send
cd wagmi-busd-send
```

2. Install the required dependencies:

```bash
npm install @wagmi/core react-web3modal web3 @wagmi/wallet-client ethers
```

3. Deploy your contract to the BSC Testnet and obtain the contract address.

## Configuration

1. In your React project, create a `wagmi.config.js` file at the root of your project.

2. Inside `wagmi.config.js`, configure the BSC Testnet:

```javascript

const testnet = {
  chainId: 97,
  chainName: "Binance Smart Chain Testnet",
  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
  blockExplorerUrls: ["https://testnet.bscscan.com/"],
  nativeCurrency: {
    name: "BNB",
    symbol: "bnb",
    decimals: 18,
  },
};

module.exports = {
  chains: {
    [testnet.chainId]: testnet,
  },
};
```

## Web3Modal Setup

1. In your React component, import the required libraries:

```javascript
import React, { useState } from "react";
import { useWeb3Modal, useWalletClient } from "@wagmi/core";
import { ethers } from "ethers";
```

2. Create a function to send BUSD tokens:

```javascript
const sendBUSD = async (recipientAddress, amountInWei) => {
  try {
    const { chainId, library, account } = useWeb3Modal();
    const { busdToken } = useWalletClient({ chainId });

    if (!busdToken) {
      console.error("BUSD token contract not available.");
      return;
    }

    const transaction = await busdToken.transfer(recipientAddress, amountInWei);
    console.log("Transaction:", transaction);
  } catch (error) {
    console.error("Error sending BUSD tokens:", error);
  }
};
```

3. In your component, create an input field to get the recipient address and amount to send:

```javascript
const SendBUSD = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = () => {
    if (recipientAddress && amount) {
      const amountInWei = ethers.utils.parseUnits(amount, 18);
      sendBUSD(recipientAddress, amountInWei);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSend}>Send BUSD</button>
    </div>
  );
};
```

4. Wrap your component with the `useWeb3Modal` hook to enable the connection to the BSC Testnet:

```javascript
function App() {
  useWeb3Modal({ chainId: 97 }); // Use the BSC Testnet

  return (
    <div className="App">
      <h1>Send BUSD Tokens</h1>
      <SendBUSD />
    </div>
  );
}

export default App;
```

## Conclusion

Congratulations! You have set up a React app to send BUSD tokens to a user address on the BSC Testnet using Web3modal and Wagmi. Make sure you have enough testnet BNB and BUSD tokens in your wallet for testing.

For more information and detailed usage, check out the documentation of the libraries used:

- [@wagmi/core](https://github.com/Wagmiio/wagmi-core)
- [react-web3modal](https://github.com/NoahZinsmeister/web3-react)
- [web3.js](https://web3js.readthedocs.io/en/v1.5.2/)
- [ethers.js](https://docs.ethers.io/v5/)

Happy coding!
