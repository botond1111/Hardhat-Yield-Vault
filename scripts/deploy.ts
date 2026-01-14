import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying contracts to Sepolia...");

  // 1. Mivel tesztneten vagyunk, először a "Hamis Pénzt" (USDC) kell kitenni
  const MockUSDC = await ethers.getContractFactory("MockUSDC");
  const usdc = await MockUSDC.deploy();
  await usdc.waitForDeployment();
  console.log(`✅ MockUSDC deployed to: ${usdc.target}`);

  // 2. A "Hamis Bank" (Protocol)
  const MockProtocol = await ethers.getContractFactory("MockLendingProtocol");
  const protocol = await MockProtocol.deploy(usdc.target);
  await protocol.waitForDeployment();
  console.log(`✅ MockProtocol deployed to: ${protocol.target}`);

  // 3. Végül a Te Vaultod (ami a fenti kettőt használja)
  const YieldVault = await ethers.getContractFactory("YieldVault");
  const vault = await YieldVault.deploy(usdc.target, protocol.target);
  await vault.waitForDeployment();

  console.log("---------------------------------------------");
  console.log(`🎉 YieldVault deployed to: ${vault.target}`);
  console.log("---------------------------------------------");
  console.log("Copy this address for your portfolio!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});