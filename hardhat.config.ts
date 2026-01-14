import { HardhatUserConfig, vars } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// KIVESSZÜK A SZÉFBŐL AZ ADATOKAT:
const SEPOLIA_RPC_URL = vars.get("SEPOLIA_RPC_URL");
const PRIVATE_KEY = vars.get("PRIVATE_KEY");
const ETHERSCAN_API_KEY = vars.get("ETHERSCAN_API_KEY"); // <--- EZ ÚJ!

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
  // EZ AZ ÚJ BLOKK A VERIFIKÁLÁSHOZ:
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;