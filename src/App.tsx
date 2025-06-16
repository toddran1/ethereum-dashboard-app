import { useEffect, useState } from "react";
import { ethers } from "ethers";

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [gasPrice, setGasPrice] = useState<string | null>(null);

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      const accounts: string[] = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
    } else {
      alert("Please install MetaMask!");
    }
  };

  const fetchBalance = async (address: string) => {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const balanceWei = await provider.getBalance(address);
    setBalance(ethers.utils.formatEther(balanceWei));
  };

  const fetchGasPrice = async () => {
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const gas = await provider.getGasPrice();
    setGasPrice(ethers.utils.formatUnits(gas, "gwei"));
  };

  useEffect(() => {
    if (walletAddress) {
      fetchBalance(walletAddress);
      fetchGasPrice();
    }
  }, [walletAddress]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🦊 Ethereum Dashboard</h1>
      {!walletAddress ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p><strong>Address:</strong> {walletAddress}</p>
          <p><strong>ETH Balance:</strong> {balance} ETH</p>
          <p><strong>Current Gas Price:</strong> {gasPrice} Gwei</p>
        </div>
      )}
    </div>
  );
}

export default App;
