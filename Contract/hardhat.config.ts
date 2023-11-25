import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "solidity-coverage";
require('dotenv').config();

const PRIVATE_KEY = process.env.privateKey || ''

const config: HardhatUserConfig = {
  networks: {
    sepolia: {
      url: `https://rpc.ankr.com/eth_sepolia`,
      accounts: [PRIVATE_KEY],
    },
    polygon_mumbai: {
      url: `https://rpc.ankr.com/polygon_mumbai`,
      accounts: [PRIVATE_KEY],
    },
  },
  solidity: "0.8.19",
};

export default config;
