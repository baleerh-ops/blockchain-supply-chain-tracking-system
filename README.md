# Blockchain-Based Supply Chain Tracking System

A blockchain-based supply chain tracking system built with **Solidity, Hardhat, Ethers.js, MetaMask, HTML, CSS, and JavaScript**.

The system uses smart contracts to register, track, update, and verify products throughout different stages of the supply chain.

## 🚀 Features

* Manufacturer and Owner access control
* Distributor access control
* Product registration
* Product status and location updates
* Supply-chain tracking history
* Product search and verification
* Dashboard statistics
* QR code generation
* QR code scanning
* Blockchain transaction details
* MetaMask wallet integration
* Responsive user interface
* Smart contract-based authorization
* Blockchain-based product records
* Product timestamps
* Product creator information

## 🛠️ Technologies

* **Solidity** — Smart contracts
* **Hardhat 3** — Blockchain development environment
* **Ethers.js** — Ethereum interaction
* **JavaScript** — Frontend logic
* **HTML5** — Application structure
* **CSS3** — User interface
* **MetaMask** — Wallet integration
* **Ethereum-compatible blockchain** — Local blockchain
* **QR Code** — Product verification
* **Node.js & npm** — Development environment
* **VS Code** — Development

## 📁 Project Structure

```text
supply-chain-project/
│
├── contracts/
│   ├── SupplyChain.sol
│   └── frontend/
│       ├── libs/
│       ├── app.js
│       ├── index.html
│       └── style.css
│
├── scripts/
│   └── deploy.ts
│
├── .gitignore
├── hardhat.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## 📋 Requirements

Before running the project, install:

* Node.js
* npm
* VS Code
* MetaMask browser extension
* VS Code Live Server extension

## ⚙️ Installation

### 1. Clone the Repository

```powershell
git clone https://github.com/baleerh-ops/blockchain-supply-chain-tracking-system.git
```

Enter the project directory:

```powershell
cd blockchain-supply-chain-tracking-system
```

### 2. Install Dependencies

```powershell
npm install
```

### 3. Build the Project

```powershell
npx hardhat build
```

## ⛓️ Start the Local Blockchain

Start the Hardhat local blockchain:

```powershell
npx hardhat node
```

The local blockchain runs on:

```text
http://127.0.0.1:8545
```

Keep this terminal running while testing the application.

## 📜 Deploy the Smart Contract

Open another terminal in the project directory and run:

```powershell
npx hardhat run scripts/deploy.ts --network localhost
```

### Current Contract

```text
Contract Address:
0xb7f8bc63bbcad18155201308c8f3540b07f84f5e
```

If the contract is redeployed, update the contract address in:

```text
contracts/frontend/app.js
```

## 🦊 Configure MetaMask

Connect MetaMask to the local Hardhat network.

Use:

```text
Network Name: Hardhat Local
RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency Symbol: ETH
```

For local development, you can import one of the test accounts displayed when running:

```powershell
npx hardhat node
```

**Important:** These accounts are for local development only. Never use or share real wallet private keys.

## 🌐 Start the Frontend

The frontend is located at:

```text
contracts/frontend/
```

Open:

```text
contracts/frontend/index.html
```

using the VS Code Live Server extension.

The application should be available at:

```text
http://127.0.0.1:5500/contracts/frontend/index.html
```

## 👥 User Roles

### Owner

The Owner can:

* Add manufacturers
* Add distributors
* Manage authorized participants

### Manufacturer

Manufacturers can:

* Register products
* Update product information
* View products
* Track products

### Distributor

Distributors can:

* Update product location
* Update product status
* Track products

### Public User

Public users can:

* Search products
* Verify products
* View tracking history
* Scan product QR codes

## 📦 Product Registration

Authorized manufacturers can register products using:

* Product name
* Location
* Status

After registration, the product is stored on the blockchain and receives a unique **Product ID**.

## 🚚 Supply-Chain Tracking

The system records product changes including:

* Location
* Status
* Timestamp
* Account address responsible for the update

These records create the product's tracking history.

## 🔍 Product Verification

Users can enter a Product ID to verify a product.

The system can display:

* Product existence
* Product name
* Current location
* Current status
* Timestamp
* Product creator

## 📱 QR Code

The system supports QR-code-based product verification.

### QR Code Generation

A QR code can be generated for a registered product.

### QR Code Scanning

Users can scan the QR code to access product information and tracking details.

## 🔗 Blockchain Transactions

The application can provide transaction information including:

* Transaction hash
* Block number
* Transaction status
* Sender address
* Contract address
* Gas information

## 📜 Smart Contract

The main smart contract is:

```text
contracts/SupplyChain.sol
```

It provides functionality for:

* Product registration
* Product updates
* Product verification
* Tracking history
* Manufacturer authorization
* Distributor authorization
* Event logging

## 🧪 Testing the Application

After starting the Hardhat node and deploying the contract:

1. Connect MetaMask.
2. Select the **Hardhat Local** network.
3. Connect the application wallet.
4. Add a manufacturer if required.
5. Register a product.
6. Check the generated Product ID.
7. Search for the product.
8. Update the product location or status.
9. View the tracking history.
10. Verify the product.
11. Generate the product QR code.
12. Test QR-code scanning.
13. Check blockchain transaction details.

## 🧰 Useful Commands

Install dependencies:

```powershell
npm install
```

Build the project:

```powershell
npx hardhat build
```

Start the local blockchain:

```powershell
npx hardhat node
```

Deploy the smart contract:

```powershell
npx hardhat run scripts/deploy.ts --network localhost
```

Clean Hardhat files:

```powershell
npx hardhat clean
```

## 🌍 Current Local Deployment

```text
Network: Hardhat Local
RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency: ETH

Contract:
0xb7f8bc63bbcad18155201308c8f3540b07f84f5e
```

## 🎯 Project Purpose

The purpose of this project is to demonstrate how **blockchain technology and smart contracts** can improve:

* Supply-chain transparency
* Product traceability
* Product verification
* Record management
* Tracking of product movement
* Access control between supply-chain participants

The project demonstrates a decentralized approach to recording product information and tracking changes across different stages of the supply chain.

## 🔮 Future Improvements

Possible future improvements include:

* Deployment to a public testnet
* IPFS integration for decentralized document storage
* Advanced QR-code verification
* Mobile application
* Improved analytics dashboard
* Multi-chain support
* Automated notifications
* Production-ready authentication

## 👨‍💻 Author

**Baleerh Muhd**

Blockchain & Solidity Developer

GitHub:
https://github.com/baleerh-ops

## 📄 License

This project is intended for educational, research, and development purposes.
