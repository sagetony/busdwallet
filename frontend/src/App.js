import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
// import { Web3Button } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
// import { alchemyProvider } from "wagmi/providers/alchemy";
import {
  bscTestnet,
  polygonMumbai,
  polygon,
  sepolia,
  mainnet,
  bsc,
} from "wagmi/chains";
import Wallet from "./components/Wallet";
import ButtonFun from "./components/ButtonFun";

const chains = [bscTestnet, polygonMumbai, polygon, sepolia, mainnet, bsc];
const projectId = "9771181434c67123b41979826ab38a7a";

const { publicClient } = configureChains(chains, [
  // alchemyProvider({ apiKey: "AVgKK1Jrqlu3d5lmlpR2AWpsJzUeeu1G" }),
  w3mProvider({ projectId }),
]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

const App = () => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <ButtonFun />
        <Wallet />
      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        defaultChain={polygonMumbai}
      />
    </>
  );
};

export default App;
