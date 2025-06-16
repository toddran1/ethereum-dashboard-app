# 🦊 Ethereum Dashboard

This is a simple Ethereum Dashboard dApp built with **React**, **TypeScript**, and **Ethers.js**. It allows users to:

- Connect their MetaMask wallet
- Display ETH balance
- Fetch current gas price (WIP)
- Read a message from a deployed smart contract
- Write a new message to the smart contract (WIP)

---

## 🚀 Features

- 🦊 Wallet connection with MetaMask
- 📡 Fetch ETH balance
- 📝 Smart contract message reading and writing (using `message()` and `setMessage()` methods)
- 🌐 Built for Sepolia Testnet

---

## 🧱 Smart Contract (MessageBoard)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageBoard {
    string public message;

    function setMessage(string calldata _msg) external {
        message = _msg;
    }
}
```

Deploy this contract on Sepolia via [Remix](https://remix.ethereum.org) or Hardhat.

---

## 🔧 Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Ethers.js v6](https://docs.ethers.org/v6/)
- [MetaMask](https://metamask.io/)
- [Cypress](https://www.cypress.io/) for E2E testing

---

## 📁 Project Structure

```
src/
│
├── constants/
│   ├── erc20.ts
│   └── messageBoard.ts     // ABI + contract address
│
├── utils/
│   └── getTokenBalance.ts
│
├── App.tsx                 // Main UI logic
├── index.tsx
├── App.css
└── ...
```

---

## 📦 Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/your-username/eth-dashboard.git
cd eth-dashboard
npm install
```

### 2. Set Contract Address

Edit `src/constants/messageBoard.ts`:

```ts
export const MESSAGE_BOARD_ADDRESS = "0xYourDeployedContractAddress";
```

---

## 🧪 Cypress Testing

Run Cypress tests:

```bash
npx cypress open
```

---

## 🌐 Network

Ensure MetaMask is connected to **Sepolia Testnet**.

Check chain ID in the browser console:

```ts
ethereum.request({ method: "eth_chainId" }).then(console.log);
// Output should be: "0xaa36a7"
```

---

## 📋 TODO

- [ ] Fix gas price fetching error
- [ ] Validate deployed contract address
- [ ] Show current message on UI
- [ ] Add loading spinners and user feedback
- [ ] Add Cypress integration tests for all flows

---

## 📜 License

MIT License © 2025 Your Name
