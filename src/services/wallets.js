const ethers = require("ethers");
const {
  saveWallet,
  getWallet,
  getWallets} = require('./databaseInteraction') ;

const getDeployerWallet =
  ({ config }) =>
  () => {
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
    console.log("Deployer wallet" + wallet.address);
    return wallet;
  };

const createWallet =
  ({ config }) =>
  async user_id => {
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    // This may break in some environments, keep an eye on it
    console.log('creating random wallet')
    const wallet = ethers.Wallet.createRandom().connect(provider);
    console.log(`wallet created with address: ${wallet.address}`)
    const walletModel = {
      user_id: user_id,
      address: wallet.address,
      privateKey:wallet.privateKey,
      amount:0,
    }
    console.log(`inserting wallet into db with user_id: ${user_id}`)
    const walletSaved = await saveWallet(walletModel);
    return walletSaved;
  };

const getWalletsData = () => () => {
  return getWallets();
};

const getWalletData = () => index => {
  return getWallet(index);
};

const getWalletFromProvider =
  ({ config }) =>
  async index => {
    const provider = new ethers.providers.AlchemyProvider(config.network, process.env.ALCHEMY_API_KEY);
    console.log(`index: ${index}`)
    const wallet = await getWallet(index)
    console.log(`provider: ${JSON.stringify(provider)}`)
    console.log(`wallet: ${JSON.stringify(wallet)}`)
    console.log(`private key: ${wallet.privateKey}`)
    
    return new ethers.Wallet(wallet.privateKey, provider);
  };

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWalletFromProvider: getWalletFromProvider({ config }),
});