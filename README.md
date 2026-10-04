# Blockchain-Based Supply Chain Tracking System

A blockchain-based supply chain tracking system developed using Solidity smart contracts, Hardhat, MetaMask, Ethers.js, HTML, CSS, and JavaScript.

The system allows authorized manufacturers and distributors to register, update, track, and verify products throughout the supply chain.

---

## 1. Project Features

* Manufacturer/Owner access control
* Distributor access control
* Product registration
* Product updating
* Supply-chain tracking history
* Product search
* Product verification
* Dashboard statistics
* QR code generation
* QR code scanning
* Blockchain transaction details
* MetaMask wallet integration
* Responsive user interface
* Smart contract-based authorization
* Blockchain-based product records
* Product creation timestamp
* Product creator information

---

## 2. Technologies Used

* Solidity
* Hardhat 3
* JavaScript
* HTML5
* CSS3
* Ethers.js
* MetaMask
* Ethereum-compatible local blockchain
* QR Code
* VS Code
* Node.js
* npm

---

## 3. Requirements

Before running the project, install:

* Node.js
* npm
* VS Code
* MetaMask browser extension
* VS Code Live Server extension

---

## 4. Project Structure

```text
supply-chain-project/
|
+-- contracts/
|   +-- SupplyChain.sol
|   |
|   +-- frontend/
|       +-- libs/
|       +-- app.js
|       +-- index.html
|       +-- style.css
|
+-- scripts/
|   +-- deploy.ts
|
+-- artifacts/
+-- cache/
+-- node_modules/
|
+-- .gitignore
+-- hardhat.config.ts
+-- package.json
+-- package-lock.json
+-- tsconfig.json
+-- README.md
```

---

## 5. Installation

### Step 1: Open the Project

Open the project folder in VS Code.

Example:

```text
C:\Users\SAMSUNG\Desktop\supply-chain-project
```

Open the VS Code terminal:

```text
Terminal -> New Terminal
```

### Step 2: Install Dependencies

Run:

```powershell
npm install
```

### Step 3: Build the Smart Contract

Run:

```powershell
npx hardhat build
```

A successful build should display:

```text
Compiled 1 Solidity file with solc 0.8.34
```

---

## 6. Start the Local Blockchain

Run:

```powershell
npx hardhat node
```

The local blockchain runs on:

```text
http://127.0.0.1:8545
```

Keep this terminal open while using the application.

---

## 7. Deploy the Smart Contract

Open another terminal in the project folder.

Run:

```powershell
npx hardhat run scripts/deploy.ts --network localhost
```

Current contract address:

```text
0xb7f8bc63bbcad18155201308c8f3540b07f84f5e
```

If you deploy the contract again, update the contract address in:

```text
contracts/frontend/app.js
```

---

## 8. Configure MetaMask

Connect MetaMask to the local Hardhat network.

Use these settings:

```text
Network Name: Hardhat Local
RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency Symbol: ETH
```

For local testing, you can import one of the test accounts displayed by:

```powershell
npx hardhat node
```

These accounts are for development and testing only.

---

## 9. Start the Frontend

The frontend is located in:

```text
contracts/frontend/
```

Open:

```text
contracts/frontend/index.html
```

using VS Code Live Server.

The application should open at:

```text
http://127.0.0.1:5500/contracts/frontend/index.html
```

---

## 10. Connect MetaMask

Open the application in your browser.

Click:

```text
Connect Wallet
```

Approve the connection request in MetaMask.

The application will display the connected wallet and user role.

---

## 11. User Roles

### Owner

The owner can:

* Add manufacturers
* Add distributors
* Manage authorized participants

### Manufacturer

A manufacturer can:

* Register products
* Update product information
* View products
* Track products

### Distributor

A distributor can:

* Update product location
* Update product status
* Track products

### Public User

Users can:

* Search products
* Verify products
* View tracking history
* Scan QR codes

---

## 12. Product Registration

Authorized manufacturers can register products by entering:

* Product name
* Location
* Status

After registration, the product is stored on the blockchain and receives a unique Product ID.

---

## 13. Product Tracking

The system records product changes including:

* Location
* Status
* Timestamp
* Address of the account that performed the update

These records form the product tracking history.

---

## 14. Product Verification

Users can enter a Product ID to verify a product.

The system can display:

* Product existence
* Product name
* Current location
* Current status
* Timestamp
* Product creator

---

## 15. QR Code

The system supports QR code generation and scanning.

### QR Code Generation

A QR code can be generated for a registered product.

### QR Code Scanning

Users can scan the QR code to access product information.

---

## 16. Blockchain Transactions

The system displays transaction information such as:

* Transaction type
* Transaction hash
* Block number
* Transaction status
* Sender address
* Contract address
* Gas information

---

## 17. Smart Contract

The main smart contract is:

```text
contracts/SupplyChain.sol
```

The contract provides:

* Product registration
* Product updates
* Product verification
* Tracking history
* Manufacturer authorization
* Distributor authorization
* Event logging

---

## 18. Testing the Application

After starting the Hardhat node and deploying the contract:

1. Connect MetaMask.
2. Select the Hardhat Local network.
3. Add a manufacturer if required.
4. Register a product.
5. Check the generated Product ID.
6. Search for the product.
7. Update the product location or status.
8. View the tracking history.
9. Verify the product.
10. Generate the product QR code.
11. Test QR code scanning.
12. Check the blockchain transaction details.

---

## 19. Important Commands

### Install dependencies

```powershell
npm install
```

### Build the project

```powershell
npx hardhat build
```

### Start local blockchain

```powershell
npx hardhat node
```

### Deploy the contract

```powershell
npx hardhat run scripts/deploy.ts --network localhost
```

### Clean Hardhat build files

```powershell
npx hardhat clean
```

---

## 20. Important Notes

The Hardhat local blockchain is intended for development and testing.

The frontend must use the address of the currently deployed smart contract.

If the contract is redeployed, update the contract address in:

```text
contracts/frontend/app.js
```

Do not share real private keys or sensitive wallet information.

---

## 21. Current Deployment

```text
Contract Address:
0xb7f8bc63bbcad18155201308c8f3540b07f84f5e

Network:
Hardhat Local

RPC URL:
http://127.0.0.1:8545

Chain ID:
31337

Currency:
ETH
```

---

## 22. Project Purpose

The purpose of this project is to demonstrate how blockchain technology and smart contracts can be used to improve supply-chain tracking, transparency, product verification, and record management.

The system provides a blockchain-based approach for recording product movement and status changes across different stages of the supply chain.
# Blockchain-Based Supply Chain Tracking System

A blockchain-based supply chain tracking system developed using Solidity smart contracts, Hardhat, MetaMask, Ethers.js, HTML, CSS, and JavaScript.

The system allows authorized manufacturers and distributors to register, update, track, and verify products throughout the supply chain.

---

## 1. Project Features

* Manufacturer/Owner access control
* Distributor access control
* Product registration
* Product updating
* Supply-chain tracking history
* Product search
* Product verification
* Dashboard statistics
* QR code generation
* QR code scanning
* Blockchain transaction details
* MetaMask wallet integration
* Responsive user interface
* Smart contract-based authorization
* Blockchain-based product records
* Product creation timestamp
* Product creator information

---

## 2. Technologies Used

* Solidity
* Hardhat 3
* JavaScript
* HTML5
* CSS3
* Ethers.js
* MetaMask
* Ethereum-compatible local blockchain
* QR Code
* VS Code
* Node.js
* npm

---

## 3. Requirements

Before running the project, install:

* Node.js
* npm
* VS Code
* MetaMask browser extension
* VS Code Live Server extension

---

## 4. Project Structure

```text
supply-chain-project/
|
+-- contracts/
|   +-- SupplyChain.sol
|   |
|   +-- frontend/
|       +-- libs/
|       +-- app.js
|       +-- index.html
|       +-- style.css
|
+-- scripts/
|   +-- deploy.ts
|
+-- artifacts/
+-- cache/
+-- node_modules/
|
+-- .gitignore
+-- hardhat.config.ts
+-- package.json
+-- package-lock.json
+-- tsconfig.json
+-- README.md
```

---

## 5. Installation

### Step 1: Open the Project

Open the project folder in VS Code.

Example:

```text
C:\Users\SAMSUNG\Desktop\supply-chain-project
```

Open the VS Code terminal:

```text
Terminal -> New Terminal
```

### Step 2: Install Dependencies

Run:

```powershell
npm install
```

### Step 3: Build the Smart Contract

Run:

```powershell
npx hardhat build
```

A successful build should display:

```text
Compiled 1 Solidity file with solc 0.8.34
```

---

## 6. Start the Local Blockchain

Run:

```powershell
npx hardhat node
```

The local blockchain runs on:

```text
http://127.0.0.1:8545
```

Keep this terminal open while using the application.

---

## 7. Deploy the Smart Contract

Open another terminal in the project folder.

Run:

```powershell
npx hardhat run scripts/deploy.ts --network localhost
```

Current contract address:

```text
0xb7f8bc63bbcad18155201308c8f3540b07f84f5e
```

If you deploy the contract again, update the contract address in:

```text
contracts/frontend/app.js
```

---

## 8. Configure MetaMask

Connect MetaMask to the local Hardhat network.

Use these settings:

```text
Network Name: Hardhat Local
RPC URL: http://127.0.0.1:8545
Chain ID: 31337
Currency Symbol: ETH
```

For local testing, you can import one of the test accounts displayed by:

```powershell
npx hardhat node
```

These accounts are for development and testing only.

---

## 9. Start the Frontend

The frontend is located in:

```text
contracts/frontend/
```

Open:

```text
contracts/frontend/index.html
```

using VS Code Live Server.

The application should open at:

```text
http://127.0.0.1:5500/contracts/frontend/index.html
```

---

## 10. Connect MetaMask

Open the application in your browser.

Click:

```text
Connect Wallet
```

Approve the connection request in MetaMask.

The application will display the connected wallet and user role.

---

## 11. User Roles

### Owner

The owner can:

* Add manufacturers
* Add distributors
* Manage authorized participants

### Manufacturer

A manufacturer can:

* Register products
* Update product information
* View products
* Track products

### Distributor

A distributor can:

* Update product location
* Update product status
* Track products

### Public User

Users can:

* Search products
* Verify products
* View tracking history
* Scan QR codes

---

## 12. Product Registration

Authorized manufacturers can register products by entering:

* Product name
* Location
* Status

After registration, the product is stored on the blockchain and receives a unique Product ID.

---

## 13. Product Tracking

The system records product changes including:

* Location
* Status
* Timestamp
* Address of the account that performed the update

These records form the product tracking history.

---

## 14. Product Verification

Users can enter a Product ID to verify a product.

The system can display:

* Product existence
* Product name
* Current location
* Current status
* Timestamp
* Product creator

---

## 15. QR Code

The system supports QR code generation and scanning.

### QR Code Generation

A QR code can be generated for a registered product.

### QR Code Scanning

Users can scan the QR code to access product information.

---

## 16. Blockchain Transactions

The system displays transaction information such as:

* Transaction type
* Transaction hash
* Block number
* Transaction status
* Sender address
* Contract address
* Gas information

---

## 17. Smart Contract

The main smart contract is:

```text
contracts/SupplyChain.sol
```

The contract provides:

* Product registration
* Product updates
* Product verification
* Tracking history
* Manufacturer authorization
* Distributor authorization
* Event logging

---

## 18. Testing the Application

After starting the Hardhat node and deploying the contract:

1. Connect MetaMask.
2. Select the Hardhat Local network.
3. Add a manufacturer if required.
4. Register a product.
5. Check the generated Product ID.
6. Search for the product.
7. Update the product location or status.
8. View the tracking history.
9. Verify the product.
10. Generate the product QR code.
11. Test QR code scanning.
12. Check the blockchain transaction details.

---

## 19. Important Commands

### Install dependencies

```powershell
npm install
```

### Build the project

```powershell
npx hardhat build
```

### Start local blockchain

```powershell
npx hardhat node
```

### Deploy the contract

```powershell
npx hardhat run scripts/deploy.ts --network localhost
```

### Clean Hardhat build files

```powershell
npx hardhat clean
```

---

## 20. Important Notes

The Hardhat local blockchain is intended for development and testing.

The frontend must use the address of the currently deployed smart contract.

If the contract is redeployed, update the contract address in:

```text
contracts/frontend/app.js
```

Do not share real private keys or sensitive wallet information.

---

## 21. Current Deployment

```text
Contract Address:
0xb7f8bc63bbcad18155201308c8f3540b07f84f5e

Network:
Hardhat Local

RPC URL:
http://127.0.0.1:8545

Chain ID:
31337

Currency:
ETH
```

---

## 22. Project Purpose

The purpose of this project is to demonstrate how blockchain technology and smart contracts can be used to improve supply-chain tracking, transparency, product verification, and record management.

The system provides a blockchain-based approach for recording product movement and status changes across different stages of the supply chain.
