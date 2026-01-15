import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying contracts to Sepolia...");

// 1. Deploy Mock USDC (The Underlying Asset)
  // We need this because we are on a testnet and cannot use real USDC.
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDC.deploy();
  await usdc.waitForDeployment();
  console.log(`✅ MockUSDC deployed to: ${usdc.target}`);

// 2. Deploy Mock Lending Protocol (The Yield Source)
  // This simulates an external protocol (like Aave/Compound) where we earn interest.
  const MockProtocol = await ethers.getContractFactory("MockLendingProtocol");
  const protocol = await MockProtocol.deploy(usdc.target);
  await protocol.waitForDeployment();
  console.log(`✅ MockProtocol deployed to: ${protocol.target}`);

 // 3. Deploy Yield Vault (The Main Contract)
  // Connects the Token and the Protocol.
  const YieldVault = await ethers.getContractFactory("YieldVault");
  const vault = await YieldVault.deploy(usdc.target, protocol.target);
  await vault.waitForDeployment();

  console.log("---------------------------------------------");
  console.log(`🎉 YieldVault deployed to: ${vault.target}`);
  console.log("---------------------------------------------");
  console.log("⚠️  Don't forget to update your frontend 'constants.ts' with these new addresses!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});