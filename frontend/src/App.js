import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bscTestnet, polygonMumbai, mainnet } from "wagmi/chains";
import Wallet from "./components/Wallet";
import ButtonFun from "./components/ButtonFun";

const chains = [bscTestnet, polygonMumbai, mainnet];
const projectId = "9771181434c67123b41979826ab38a7a";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
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
