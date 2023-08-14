import * as React from "react";
import { Web3Button } from "@web3modal/react";

const styles = {
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "39%",
  },
};
const ButtonFun = () => {
  return (
    <>
      <div style={styles.centerContainer}>
        <h3>BUSDPortal</h3>
        <Web3Button />
      </div>
      ;
    </>
  );
};

export default ButtonFun;
