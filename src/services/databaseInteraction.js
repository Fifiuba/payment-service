const { WalletModel, TransactionModel } = require('../database/schema');


const saveTransaction = () => async (t) => {
    try {
        const transaction = TransactionModel(t)
        const transactionSaved =  await transaction.save();
        console.log('transaction saved:' + JSON.stringify(transactionSaved))
    } catch (error) {
        console.error('could not insert new transaction to database')
    }   
}

const saveWallet = async (w) => {
    let walletSaved = await WalletModel.findOne({user_id: w.user_id}) 
    if (walletSaved){
        console.log('There is an already saved wallet for this user')
        return walletSaved
    }
    try {      
        const wallet = new WalletModel(w)
        walletSaved =  await wallet.save();
        console.log('wallet saved:' + JSON.stringify(walletSaved))
    } catch (error) {
        //console.error('could not insert new wallet to database')
        console.log('could not insert new wallet to database')
    } 
    return walletSaved
    
}

const getTransactions = async() => {
    try {
        const transactions = TransactionModel.find({});
        return transactions
    } catch (error) {
        console.error('could not execute find all transactions')
    }
}

const getTransaction =  async (id) => {
    const transaction = TransactionModel.findById(id).exec();
    return transaction
}

const getWallets =  async() => {
    try {
        const wallets = WalletModel.find({});
        return wallets
    } catch (error) {
        console.error('could not execute find all wallets')
    }
}

const getWallet = async (user_id) => {
    const wallet = await WalletModel.findOne({user_id: user_id});
    return wallet
}


module.exports = {
    saveTransaction,
    saveWallet,
    getTransaction,
    getTransactions,
    getWallet,
    getWallets,
};
