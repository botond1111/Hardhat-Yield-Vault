# 🏦 Hardhat Yield Vault (Sepolia Deployment)

This repository demonstrates a **production-grade development environment** for Ethereum smart contracts. It includes a complete workflow: form local development and testing with Hardhat to live deployment on the **Sepolia Testnet**.

## 🛠 Tech Stack

* **Framework:** Hardhat (TypeScript)
* **Language:** Solidity ^0.8.20
* **Network:** Ethereum Sepolia Testnet
* **Infra:** Alchemy RPC
* **Testing:** Mocha, Chai & Hardhat Toolbox
* **Security:** Negative Testing patterns & Secure Config Management

## 🚀 Key Features

* **ERC4626 Implementation:** Standardized Yield Bearing Vault logic.
* **Mock Integration:** Includes MockUSDC and MockProtocol for realistic testing.
* **Secure Deployment:** Uses `hardhat vars` (or `.env`) to keep private keys safe.
* **Comprehensive Tests:** Covers Happy Paths and Edge Cases (Security checks).

---

## ⚙️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPO_URL>
    cd yield-vault
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    This project uses Hardhat Configuration Variables for security (no `.env` file needed).
    
    Set your Alchemy URL (Sepolia):
    ```bash
    npx hardhat vars set SEPOLIA_RPC_URL
    ```
    
    Set your Deployer Private Key:
    ```bash
    npx hardhat vars set PRIVATE_KEY
    ```
    *(See `.env.example` for reference if you prefer using a file)*

---

## 🧪 Automated Tests

The project includes a comprehensive test suite to ensure contract security before deployment.

Run the tests:
```bash
npx hardhat test
```
Test Coverage:

✅ Asset & Protocol Configuration

✅ Deposit Logic (Share Calculation)

🔒 Security: Prevents 0 asset deposits

🔒 Security: Prevents 0 share withdrawals

🔒 Security: Prevents excessive withdrawals

🌐 Deployment (Sepolia)
### 📜 Verified Contract (Sepolia)
**YieldVault:** [`0x896E6448DCc7b6711a1640C9d80843f3f24E129D`](https://sepolia.etherscan.io/address/0x896E6448DCc7b6711a1640C9d80843f3f24E129D#code)
To deploy the contracts to the live Ethereum Sepolia Testnet:

Bash

npx hardhat run scripts/deploy.ts --network sepolia
Expected Output: The script will deploy 3 contracts:

MockUSDC (Test Token)

MockProtocol (Yield Source)

YieldVault (The Main Contract)

📂 Project Structure
contracts/ - Smart contract source code (Vault & Mocks).

scripts/ - Deployment scripts (TypeScript).

test/ - Automated security tests.

hardhat.config.ts - Network and compiler configuration.
