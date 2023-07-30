import { Web3Button } from "@web3modal/react";

const styles = {
  centerContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "10vh",
    marginLeft: "100vh",
  },
};

function HomePage() {
  return (
    <div>
      <div style={styles.centerContainer}>
        <h3>BUSD Wallet</h3>
        <Web3Button />
        
      </div>
    </div>
  );
}

export default HomePage;
