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
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState(0);
  const [account, setAddress] = useState(null);


  const handleChangeAmount = async (event) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/[^0-9]/g, "");
    const amount = ethers.utils.parseEther(sanitizedValue + 0)
    setValue(sanitizedValue);
    setAmount(amount.toString());
  };

  const handleChangeAddress = async (event) => {
    setAddress(event.target.value);
  };

  const { config: myConfig1 } = usePrepareContractWrite({
    address: TokenAddress.address,
    abi: TokenContract.abi,
    functionName: "approve",
    args: [contractAddress.address, amount],
    chainId: 97,
  });

  const { config: myConfig2 } = usePrepareContractWrite({
    address: contractAddress.address,
    abi: contractABI.abi,
    functionName: "sendToken",
    args: [account, amount],
    chainId: 97,

  });

  const { data: dataFunction1, write: functionApprove } = useContractWrite(myConfig1);
  const { data: dataFunction3, write: functionTransfer } = useContractWrite(myConfig2);

  const waitForTransaction = useWaitForTransaction({
    hash: dataFunction1?.hash,
    confirmations: 2,
    onSuccess(dataFunction1) {
      functionTransfer?.();
    },
    onError(error) {
      console.log(error);
    },
  });

  const waitForTransaction2 = useWaitForTransaction({
    hash: dataFunction3?.hash,
    confirmations: 2,
    onSuccess(dataFunction3) {},
    onError(error) {
      console.log(error);
    },
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>Transfer BUSD</h2>
      {waitForTransaction.isLoading ? (
        <h5>Approving Transaction..</h5>
      ) : (
        <p></p>
      )}
      {waitForTransaction2.isSuccess ? (
        <h5>Transaction Successful!!!</h5>
      ) : (
        <p></p>
      )}
      <form onSubmit={(e) => {
        e.preventDefault()
        functionApprove?.()
      }}>
        <TextField
          label="Address"
          name="address"
          value={account}
          onChange={handleChangeAddress}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Amount"
          name="amount"
          value={value}
          onChange={handleChangeAmount}
          fullWidth
          margin="normal"
          variant="outlined"
        />

        <Button
          disabled={
            !functionApprove ||
            waitForTransaction.isLoading  }
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
