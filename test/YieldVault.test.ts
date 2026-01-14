import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("YieldVault System", function () {
  
  // --- SETUP ---
  async function deployVaultFixture() {
    const [owner, user] = await ethers.getSigners();

    const MockUSDC = await ethers.getContractFactory("MockUSDC");
    const usdc = await MockUSDC.deploy();

    const MockProtocol = await ethers.getContractFactory("MockLendingProtocol");
    const protocol = await MockProtocol.deploy(usdc.target);

    const YieldVault = await ethers.getContractFactory("YieldVault");
    const vault = await YieldVault.deploy(usdc.target, protocol.target);

    return { vault, usdc, protocol, owner, user };
  }

  // --- POZITÍV TESZTEK (Happy Path) ---

  it("Should set the right asset address", async function () {
    const { vault, usdc } = await loadFixture(deployVaultFixture);
    expect(await vault.asset()).to.equal(usdc.target);
  });

  it("Should allow a user to deposit and receive shares", async function () {
    const { vault, usdc, user } = await loadFixture(deployVaultFixture);
    
    // Előkészületek: Pénz küldése a Usernek + Approve
    await usdc.transfer(user.address, ethers.parseEther("1000"));
    await usdc.connect(user).approve(vault.target, ethers.parseEther("100"));

    // A tesztelt művelet: Deposit
    await vault.connect(user).deposit(ethers.parseEther("100"));

    // Ellenőrzés
    expect(await vault.balanceOf(user.address)).to.equal(ethers.parseEther("100"));
    expect(await vault.totalAssets()).to.equal(ethers.parseEther("100"));
  });

  // --- NEGATÍV TESZTEK (Biztonság) ---

  it("Should fail if user tries to deposit 0 assets", async function () {
    const { vault, user } = await loadFixture(deployVaultFixture);
    
    // Elvárjuk, hogy dobja a "ZeroAssets" hibát
    await expect(vault.connect(user).deposit(0))
      .to.be.revertedWithCustomError(vault, "ZeroAssets");
  });

  it("Should fail if user tries to withdraw 0 shares", async function () {
    const { vault, user } = await loadFixture(deployVaultFixture);
    
    // Elvárjuk, hogy dobja a "ZeroShares" hibát
    await expect(vault.connect(user).withdraw(0))
      .to.be.revertedWithCustomError(vault, "ZeroShares");
  });

  it("Should fail if user tries to withdraw more than they have", async function () {
    const { vault, user } = await loadFixture(deployVaultFixture);
    
    // Nincs share-je, de ki akar venni. Buknia kell.
    await expect(vault.connect(user).withdraw(ethers.parseEther("1000")))
      .to.be.reverted; 
  });

});