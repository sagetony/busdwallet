require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.19",
//   defaultNetwork: "hardhat",
//   networks: {
//     bsc_testnet: {
//       url: "https://data-seed-prebsc-1-s1.binance.org:8545",
//       chainId: 97,
//       accounts: [process.env.PRIVATE_KEY],
//     },
//   },
// };
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    Sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111,
      blockConfirmation: 6,
    },
  },
};
// gasPrice: 20000000000, // 20 gwei (adjust this according to the current gas price on BSC)
