require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-verify');
require('dotenv').config();

module.exports = {
  solidity: '0.8.20',

  networks: {
    polygonMumbai: {
      chainId: 80001,
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  etherscan: {
    url: 'https://mumbai.polygonscan.com',
    apiKey: process.env.POLYGONMUMBAI_API_KEY,
  },
};
