import { useEffect, useState } from "react";
import {
  ethers,
  formatEther,
  formatUnits,
  BrowserProvider,
} from "ethers";
import { getTokenBalance } from "./utils/getTokenBalance";
import {
  MESSAGE_BOARD_ABI,
  MESSAGE_BOARD_ADDRESS,
} from "./constants/messageBoard";

function App() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [gasPrice, setGasPrice] = useState<string | null>(null);
  const [tokenInfo, setTokenInfo] = useState<{ balance: string; symbol: string } | null>(null);
  const [contractMessage, setContractMessage] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");

  const connectWallet = async () => {
  if (window.ethereum) {
    // Force MetaMask to switch networks if needed
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xaa36a7" }]
    });

    const accounts: string[] = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    setWalletAddress(accounts[0]);
  } else {
    alert("Please install MetaMask!");
  }
};


  const fetchBalance = async (address: string) => {
    const provider = new BrowserProvider(window.ethereum);
    const balanceWei = await provider.getBalance(address);
    setBalance(formatEther(balanceWei));
  };

  const fetchGasPrice = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const gas = await provider.getGasPrice();
    setGasPrice(formatUnits(gas, "gwei"));
  };

  const fetchTokenBalance = async () => {
    if (!walletAddress) return;
    // const provider = new BrowserProvider(window.ethereum);
    // const tokenAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // USDC (Ethereum Mainnet)

    // const info = await getTokenBalance(tokenAddress, walletAddress, provider);
    // setTokenInfo(info);
  };

  const fetchMessage = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(MESSAGE_BOARD_ADDRESS, MESSAGE_BOARD_ABI, provider);
    const msg = await contract.message();
    setContractMessage(msg);
  };

  const updateMessage = async () => {
    try {
      console.log("→ Contract address being used:", MESSAGE_BOARD_ADDRESS);

      console.log("Sending tx to contract with message:", newMessage);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(MESSAGE_BOARD_ADDRESS, MESSAGE_BOARD_ABI, signer);

      const tx = await contract.setMessage(newMessage); // 👈 MetaMask popup triggered here
      console.log("Transaction sent:", tx.hash);

      await tx.wait(); // 👈 Waits for block confirmation
      console.log("Transaction confirmed!");

      fetchMessage(); // Refresh
      setNewMessage(""); // Clear input
    } catch (err) {
      console.error("Error writing message:", err);
      alert("MetaMask failed to send the transaction. Please try again.");
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchBalance(walletAddress);
      fetchGasPrice();
      fetchTokenBalance();
      fetchMessage();
    }
  }, [walletAddress]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", color: "#fff", background: "#111", minHeight: "100vh" }}>
      <h1>🦊 Ethereum Dashboard</h1>
      {!walletAddress ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p><strong>Address:</strong> {walletAddress}</p>
          <p><strong>ETH Balance:</strong> {balance ?? "Loading..."} ETH</p>
          <p><strong>Gas Price:</strong> {gasPrice ?? "Loading..."} Gwei</p>
          {tokenInfo && (
            <p><strong>{tokenInfo.symbol} Balance:</strong> {tokenInfo.balance}</p>
          )}
          <p><strong>MessageBoard message:</strong> {contractMessage}</p>
          <div style={{ marginTop: "1rem" }}>
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="New message"
              style={{ padding: "0.5rem" }}
            />
            <button onClick={updateMessage} style={{ marginLeft: "1rem" }}>
              Update Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
