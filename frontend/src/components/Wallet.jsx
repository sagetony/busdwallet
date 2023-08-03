import * as React from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import { TextField, Button } from "@material-ui/core";
import contractAddress from "../abis/contractData/BusdWallet-address.json";
import contractABI from "../abis/contractData/BusdWallet.json";
import TokenContract from "../abis/contractData/TokenContract.json";
import TokenAddress from "../abis/contractData/TokenContract-address.json";
import { useState } from "react";

const Wallet = () => {
  const [amount, setAmount] = useState(null);
  const [address, setAddress] = useState(null);
  const decimals = 18;

  const handleChangeAmount = async (event) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^0-9]/g, "");
    setAmount(sanitizedValue);
  };

  const handleChangeAddress = async (event) => {
    setAddress(event.target.value);
  };

  const { config: myConfig1 } = usePrepareContractWrite({
    address: "0xF7a71cC9A80536A2e87D83Bc7756b0d1bf73391d",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "tokenAddress",
            type: "address",
          },
        ],
        name: "balanceOf",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "balances",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "burn",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokens",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    functionName: "approve",
    args: ["0x355970E4261E2D1f6B3593d840fEd3269D571B0A", 1000],
    chainId: 80001,
  });

  console.log(myConfig1, "dasasasaaaaaaaaaaaaa");

  const { config: myConfig2 } = usePrepareContractWrite({
    address: contractAddress.address,
    abi: contractABI.abi,
    functionName: "receiveToken",
    args: [100],
    chainId: 80001,
  });

  const { config: myConfig3 } = usePrepareContractWrite({
    address: contractAddress.address,
    abi: contractABI.abi,
    functionName: "sendToken",
    args: ["0x1162B4951f2D1a78f461A4b1A7eECF8ad1213864", 100],
    chainId: 80001,
  });

  const { data: dataFunction1, write: function1 } = useContractWrite(myConfig1);
  const { data: dataFunction2, write: function2 } = useContractWrite(myConfig2);
  const { data: dataFunction3, write: function3 } = useContractWrite(myConfig3);

  const handleTransfer = async (event) => {
    event.preventDefault();
    function1();
  };
  const handleTransfer2 = async () => {
    function2();
  };
  const handleTransfer3 = async () => {
    function3();
  };

  const waitForTransaction = useWaitForTransaction({
    hash: dataFunction1?.hash,
    // enabled: false,
    confirmations: 2,
    onSuccess(dataFunction1) {
      handleTransfer2();
    },
    onError(error) {
      console.log(error);
    },
  });
  const waitForTransaction2 = useWaitForTransaction({
    hash: dataFunction2?.hash,
    // enabled: false,
    confirmations: 2,
    onSuccess(dataFunction2) {
      handleTransfer3();
    },
    onError(error) {
      console.log(error);
    },
  });
  const waitForTransaction3 = useWaitForTransaction({
    hash: dataFunction3?.hash,
    // enabled: false,
    confirmations: 2,
    onSuccess(dataFunction3) {},
    onError(error) {
      console.log(error);
    },
  });

  //   const handleKeyDown = (event) => {
  //     if (event.key === "Backspace" && amount === 0) {
  //       event.preventDefault();
  //     }
  //   };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Transfer BUSD</h2>
      {waitForTransaction.isLoading ? (
        <h5>Approving Transaction..</h5>
      ) : (
        <p></p>
      )}
      {waitForTransaction2.isLoading ? <h5>Sending Transaction..</h5> : <p></p>}
      {waitForTransaction3.isSuccess ? (
        <h5>Transaction Successful!!!</h5>
      ) : (
        <p></p>
      )}
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

        <Button
          disabled={
            !function1 ||
            waitForTransaction.isLoading ||
            waitForTransaction2.isLoading
          }
          variant="contained"
          color="primary"
          type="submit"
        >
          Transfer
        </Button>
      </form>
    </div>
  );
};

export default Wallet;
