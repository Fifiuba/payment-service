const { WalletModel, TransactionModel } = require('../database/schema');


const saveTransaction = async (t) => {
    let transactionSaved = await TransactionModel.findOne({tx: t.tx}) 
    if (transactionSaved){
        console.log('There is an already saved transaction for this user')
        return transactionSaved
    }
    try {
        const transaction = new TransactionModel(t)
        transactionSaved =  await transaction.save();
        console.log(transactionSaved)
        console.log('transaction saved:' + JSON.stringify(transactionSaved))
    } catch (error) {
        console.error('could not insert new transaction to database')
    }   
    return transactionSaved
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

const getTransaction =  async (tx) => {
    const transaction = await TransactionModel.findOne({tx: tx});
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
