# 🛡️ Hardhat Yield Vault (Professional Setup)

This repository demonstrates a **production-grade development environment** for smart contracts. Unlike browser-based simulations, this project utilizes **Hardhat** for local compilation, deployment, and automated testing.

## 🛠 Tech Stack
* **Framework:** Hardhat (TypeScript)
* **Language:** Solidity ^0.8.20
* **Testing:** Mocha, Chai & Hardhat Toolbox
* **Security:** Custom Errors & Negative Testing patterns

## 🧪 Automated Tests
The project includes a comprehensive test suite covering both "Happy Paths" and "Edge Cases" (Security checks).

To run the tests:
```bash
npx hardhat test
```
Test Coverage:
✅ Asset & Protocol Configuration

✅ Deposit Logic (Share Calculation)

🔒 Security: Prevents 0 asset deposits

🔒 Security: Prevents 0 share withdrawals

🔒 Security: Prevents excessive withdrawals

📂 Project Structure
contracts/ - The smart contract source code (Vault & Mocks).

test/ - TypeScript automated tests.

hardhat.config.ts - Network and compiler configuration.