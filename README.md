# 🌌 FundWatcher: Campus Web3

**A decentralized application (dApp) bringing transparency, immutability, and efficiency to campus budget disbursements.**  
Built for **Hack JMI 2026**.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://[YOUR_VERCEL_LINK_HERE])
[![Polygon Amoy](https://img.shields.io/badge/Network-Polygon_Amoy-8247E5?style=for-the-badge&logo=polygon)](https://amoy.polygonscan.com/)

---

## 📖 Overview

Managing student club budgets in universities often involves unclear approvals, delays, and lack of accountability.

**FundWatcher** solves this by introducing a **blockchain-powered funding system** where every transaction is transparent, verifiable, and immutable.

Student leaders can submit funding proposals, and university admins can securely approve and release funds — all recorded on-chain.

---

## ✨ Key Features

- 🔐 **Role-Based Access Control**  
  Only the contract deployer (Admin) can approve and release funds.

- ⛓️ **On-Chain Transparency**  
  Proposal details like wallet address, requested amount, and approval status are stored on the blockchain.

- ⚡ **Low Gas Architecture**  
  Heavy data stored off-chain, keeping transactions fast and cost-efficient.

- 🎨 **Modern Cyberpunk UI**  
  Responsive UI with real-time blockchain updates, wallet detection, and glassmorphism design.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS  
- **Web3:** Ethers.js (v6), MetaMask  
- **Smart Contracts:** Solidity  
- **Network:** Polygon Amoy Testnet  
- **Deployment:** Vercel + Hardhat Ignition  

---

## 🧠 Technical Highlight

While deploying on Polygon Amoy, default gas estimation caused errors:

```
transaction gas price below minimum
```

### ✅ Fix

```javascript
const tx = await contract.submitProposal(amountInWei, {
  maxFeePerGas: ethers.parseUnits("30", "gwei"),
  maxPriorityFeePerGas: ethers.parseUnits("30", "gwei")
});
```

---

## 🚀 Live Demo & Testing

🔗 **Live App:** [Insert Your Vercel Link]

### 🧪 How to Test

1. Install MetaMask  
2. Switch to **Polygon Amoy Testnet**

### 🔄 Flow

- 👤 Submit proposal (any wallet with test tokens)
- 🛡️ Admin logs in (deployer wallet)
- 💸 Click **Approve & Release Funds**
- ✅ Status updates instantly on UI

---

## 💻 Run Locally

```bash
git clone https://github.com/priy0767/Fundwatcher.git
cd client
npm install
npm run dev
```

---

## 👨‍💻 Developer

**Priyanshu Soni**  
PSIT Kanpur  

Built for **Hack JMI 2026**

---

## 🚀 Future Scope

- 📊 Analytics dashboard for fund tracking  
- 🏫 Multi-university deployment  
- 🔔 Notification system  
- 📱 Mobile app version  

---


