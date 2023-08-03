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

export function Wallet() {
  const [amount, setAmount] = useState(0);
  const [address, setAddress] = useState(null);
  const decimals = 18;
  const amountToken = ethers.utils.parseUnits(amount.toString(), decimals);

  const handleChangeAmount = async (event) => {
    setAmount(event.target.value);
  };

  const handleChangeAddress = async (event) => {
    setAddress(event.target.value);
  };

  const { config } = usePrepareContractWrite({
    address: TokenAddress.address,
    abi: TokenContract.abi,
    functionName: "approve",
    args: [contractAddress.address, 100],
    chainId: 11155111,
  });

  //   const { config: myConfig2 } = usePrepareContractWrite({
  //     address: contractAddress.address,
  //     abi: contractABI.abi,
  //     functionName: "receiveToken",
  //     args: [100],
  //   });

  //   const { config: myConfig3 } = usePrepareContractWrite({
  //     address: contractAddress.address,
  //     abi: contractABI.abi,
  //     functionName: "sendToken",
  //     args: [address, 1000],
  //   });

  const { data, write } = useContractWrite(config);
  //   const { data: dataFunction2, write: function2 } = useContractWrite(myConfig2);
  //   const { data: dataFunction3, write: function3 } = useContractWrite(myConfig3);

  console.log(write, config, "fsd");

  const handleTransfer = async (event) => {
    event.preventDefault();
    write?.();
  };
  //   const handleTransfer2 = async () => {
  //     function2();
  //   };
  //   const handleTransfer3 = async () => {
  //     function3();
  //   };

  const waitForTransaction = useWaitForTransaction({
    hash: data?.hash,
    // enabled: false,
    confirmations: 2,
    onSuccess(data) {
      //   handleTransfer2();
    },
    onError(error) {
      console.log(error);
    },
  });
  //   const waitForTransaction2 = useWaitForTransaction({
  //     hash: dataFunction2?.hash,
  //     // enabled: false,
  //     confirmations: 2,
  //     onSuccess(dataFunction2) {
  //       handleTransfer3();
  //     },
  //     onError(error) {
  //       console.log(error);
  //     },
  //   });
  //   const waitForTransaction3 = useWaitForTransaction({
  //     hash: dataFunction3?.hash,
  //     // enabled: false,
  //     confirmations: 2,
  //     onSuccess(dataFunction3) {},
  //     onError(error) {
  //       console.log(error);
  //     },
  //   });

  //   const handleKeyDown = (event) => {
  //     if (event.key === "Backspace" && amount === 0) {
  //       event.preventDefault();
  //     }
  //   };
  return (
    <div style={{ padding: "20px" }}>
      <h2>Transfer BUSD</h2>
      {/* {waitForTransaction.isLoading ? (
        <h5>Approving Transaction..</h5>
      ) : (
        <p></p>
      )}
      {waitForTransaction2.isLoading ? <h5>Sending Transaction..</h5> : <p></p>}
      {waitForTransaction3.isSuccess ? (
        <h5>Transaction Successful!!!</h5>
      ) : (
        <p></p>
      )} */}
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
          disabled={!write}
          variant="contained"
          color="primary"
          type="submit"
        >
          Transfer
        </Button>
      </form>
    </div>
  );
}
