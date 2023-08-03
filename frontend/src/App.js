import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { Web3Button } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia, mainnet, polygon, bsc } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { Wallet } from "./components/Wallet";
const chains = [sepolia, mainnet, polygon, bsc];
const projectId = "9771181434c67123b41979826ab38a7a";

const { publicClient, webSocketPublicClient } = configureChains(chains, [
  alchemyProvider({ apiKey: "gerw2GTNYsJu-lBESFsJ3VZchd27Mbk6" }),
  w3mProvider({ projectId }),
]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),

  publicClient,
  webSocketPublicClient,
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
  console.log(chains, ethereumClient, publicClient);

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <div style={styles.centerContainer}>
          <h3>BUSD Wallet</h3>
          <Web3Button />
        </div>
        <Wallet />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
