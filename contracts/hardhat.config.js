require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-verify');
require('dotenv').config();

module.exports = {
  solidity: '0.8.20',

  networks: {
    polygonMumbai: {
      chainId: 80001,
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk',
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 20,
        passphrase: '',
      },
    },
  },
  etherscan: {
    url: 'https://mumbai.polygonscan.com',
    apiKey: process.env.POLYGONMUMBAI_API_KEY,
  },
};
