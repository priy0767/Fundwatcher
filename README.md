# 🌌 FundWatcher: Campus Web3

**A decentralized application (dApp) bringing transparency, immutability, and efficiency to campus budget disbursements.** Built for the **Weilliptic Hackathon - Xpecto'26**.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://fundwatcher.vercel.app/)
[![Polygon Amoy](https://img.shields.io/badge/Network-Polygon_Amoy-8247E5?style=for-the-badge&logo=polygon)](https://amoy.polygonscan.com/)

---

## 📖 Overview
Managing student club budgets often involves opaque approval processes and delayed fund transfers. FundWatcher solves this by replacing traditional university ledgers with a transparent smart contract on the Polygon blockchain. 

Student leaders submit project proposals on-chain, and university administrators use a secure, cryptographic portal to review and disburse actual tokens with a single click. 



## ✨ Key Features
* **Role-Based Access Control:** Only the wallet that deployed the contract (University Admin) has the cryptographic authority to approve funds.
* **On-Chain Financial Truth:** The core financial data (Proposer address, requested token amount, and approval status) is processed directly on the Polygon Amoy testnet.
* **Gas-Optimized Architecture:** To keep transaction costs near zero for students, "heavy" metadata (like detailed text descriptions) is kept off-chain via localized storage, while the financial truth is anchored on-chain.
* **Dynamic Tech-Noir UI:** A custom, fully responsive cyberpunk interface built with Tailwind CSS, featuring glassmorphism, dynamic wallet status indicators, and real-time blockchain state syncing.

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, Tailwind CSS
* **Web3 Integration:** Ethers.js (v6), MetaMask Provider
* **Smart Contract:** Solidity
* **Blockchain Network:** Polygon Amoy Testnet
* **Deployment:** Vercel (Frontend), Hardhat Ignition (Contract)

## 🧠 Technical Highlights & Problem Solving
During development on the Polygon Amoy testnet, standard Ethers.js gas estimations resulted in `transaction gas price below minimum` rejections. This was solved by hardcoding specific gas parameters into the transaction calls to meet Amoy's updated network requirements:

```javascript
// Forcing 30 Gwei to ensure network acceptance on Polygon Amoy
const tx = await contract.submitProposal(amountInWei, {
    maxFeePerGas: ethers.parseUnits("30", "gwei"),
    maxPriorityFeePerGas: ethers.parseUnits("30", "gwei")
});
