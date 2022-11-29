const { WalletModel, TransactionModel } = require('../database/schema');


const saveTransaction = async (t) => {
    try {
        const transaction = TransactionModel(t)
        const transactionSaved =  await transaction.save();
        console.log('transaction saved:' + JSON.stringify(transactionSaved))
    } catch (error) {
        console.error('could not insert new transaction to database')
    }   
}

const saveWallet = async (w) => {
    try {
        const wallet = WalletModel(w)
        const walletSaved =  await wallet.save();
        console.log('wallet saved:' + JSON.stringify(walletSaved))
    } catch (error) {
        console.error('could not insert new wallet to database')
    }  
    
}

const getTransactions = async() => {
    try {
        const transactions = TransactionModel.find({});
        return transactions
    } catch (error) {
        console.error('could not execute find all transactions')
    }
}

const getTransaction = async (id) => {
    const transaction = TransactionModel.findById(id).exec();
    
    if (!transaction) throw new TransactionNotFoundError();

    return transaction
}

const getWallets = async() => {
    try {
        const wallets = WalletModel.find({});
        return wallets
    } catch (error) {
        console.error('could not execute find all wallets')
    }
}

const getWallet = async (id) => {
    const wallet = WalletModel.findById(id).exec();

    if (!wallet) throw new WalletNotFoundError();
    return wallet
}


module.exports = () => ({
    saveTransaction: saveTransaction,
    saveWallet: saveWallet,
    getTransaction: getTransaction,
    getTransactions: getTransactions,
    getWallet: getWallet,
    getWallets: getWallets,
});

module.exports = {saveWallet,saveTransaction};
