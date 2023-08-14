async function main() {
  const [deployer, address1, address2] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Get the ContractFactories and Signers here.
  const Busdwallet = await ethers.getContractFactory("BusdHandler");
  const Tokencontract = await ethers.getContractFactory("TokenContract");

  // deploy contract
  const tokencontract = await Tokencontract.deploy();

  const tokenAddress = await tokencontract.getAddress();

  const busdwallet = await Busdwallet.deploy(tokenAddress);

  const busdwalletAddress = await busdwallet.getAddress();

  console.log(
    "Deploying contracts with the Token Contract account:",
    tokenAddress
  );

  console.log(
    "Deploying contracts with the Busdwallet account:",
    busdwalletAddress
  );

  // Save copies of each contracts abi and address to the frontend.
  saveFrontendFiles(busdwallet, "BusdWallet", busdwalletAddress)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  saveFrontendFiles(tokencontract, "TokenContract", tokenAddress)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

async function saveFrontendFiles(contract, name, contractAddress) {
  const path = require("path");
  const fs = require("fs");
  const newPath = path.join(__dirname, "../");

  const contractsDir = newPath + "frontend/src/abis/contractData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/${name}-address.json`,
    JSON.stringify({ address: contractAddress }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync(name);

  fs.writeFileSync(
    contractsDir + `/${name}.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
