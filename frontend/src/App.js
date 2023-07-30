import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { Web3Button } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon, bsc } from "wagmi/chains";
import { ethers, utils } from "ethers";
import { TextField, Button } from "@material-ui/core";
import contractAddress from "../src/abis/contractData/BusdWallet-address.json";
import contractABI from "../src/abis/contractData/BusdWallet.json";
import TokenContract from "../src/abis/contractData/TokenContract.json";
import TokenAddress from "../src/abis/contractData/TokenContract-address.json";
import { useState } from "react";
// import HomePage from "./component/HomePage";
const chains = [arbitrum, mainnet, polygon, bsc];
const projectId = "9771181434c67123b41979826ab38a7a";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const styles = {
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "39%",
  },
};

function App() {
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState(null);

  const handleChangeAmount = async (event) => {
    setAmount(event.target.value);
  };

  const handleChangeAddress = async (event) => {
    setAddress(event.target.value);
  };
  const handleTransfer = async (event) => {
    event.preventDefault();
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const busdContract = new ethers.Contract(
        contractAddress.address,
        contractABI.abi,
        signer
      );

      const tokenContract = new ethers.Contract(
        TokenAddress.address,
        TokenContract.abi,
        signer
      );

      const decimals = 18;
      const amountToken = ethers.utils.parseUnits(amount, decimals);

      const approveTx = await tokenContract.approve(
        busdContract.address,
        amountToken
      );
      await approveTx.wait();

      const transferTx = await busdContract.receiveToken(amountToken);
      await transferTx.wait();

      const transfersendTx = await busdContract.sendToken(address, amountToken);
      await transfersendTx.wait();

      alert("sent");
    }
  };

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <div style={styles.centerContainer}>
          <h3>BUSD Wallet</h3>
          <Web3Button />
        </div>
        <div style={{ padding: "20px" }}>
          <h2>Transfer BUSD</h2>
          <form onSubmit={handleTransfer}>
            <TextField
              label="Address"
              name="address"
              value={address}
              onChange={handleChangeAddress}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Amount"
              name="amount"
              value={amount}
              onChange={handleChangeAmount}
              fullWidth
              margin="normal"
              variant="outlined"
            />

            <Button variant="contained" color="primary" type="submit">
              Transfer
            </Button>
          </form>
        </div>
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
