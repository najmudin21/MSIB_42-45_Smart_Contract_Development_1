import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import "hardhat-contract-sizer";
import "hardhat-prettier";


dotenv.config()

const {
  MNEMONIC
} = process.env

const config: HardhatUserConfig = {
  solidity: {
    compilers : [
      {
        version : "0.8.19",
        settings : {
          optimizer : {
            enabled : true,
            runs : 200
          }
        }
      }
    ]
  },
  
  defaultNetwork : "hardhat",
  networks : {
    hardhat : {
      chainId : 1337,
      accounts : {
        mnemonic: MNEMONIC,
        accountsBalance: "10000000000000000000000000"
      }
    },
  },
  paths : {
    deployments : './deployments',
    artifacts: './artifacts',
    cache: './cache',
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  typechain: {
    outDir: './typechain',
    target: 'ethers-v6',
  },
};

export default config;
