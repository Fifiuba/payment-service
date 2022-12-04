const { WalletModel, TransactionModel } = require('../database/schema');


const saveTransaction = async (t) => {
    let transactionSaved = null
    try{
        transactionSaved = await TransactionModel.findOne({tx: t.tx}) 
    }catch(error){}
    
    if (transactionSaved){
        console.log('There is an already saved transaction for this user')
        return transactionSaved
    }
    try {
        const transaction = new TransactionModel(t)
        transactionSaved =  await transaction.save();
        console.log('transaction saved:' + JSON.stringify(transactionSaved))
    } catch (error) {
        console.error('could not insert new transaction to database')
    }   
    return transactionSaved
}

const saveWallet = async (w) => {
    let walletSaved = null
    try{
        walletSaved = await WalletModel.findOne({user_id: w.user_id}) 
    }catch(error){}

    if (walletSaved){
        console.log('There is an already saved wallet for this user')
        return walletSaved
    }
    try {      
        const wallet = new WalletModel(w)
        walletSaved =  await wallet.save();
        console.log('wallet saved:' + JSON.stringify(walletSaved))
        return walletSaved
    } catch (error) {
        console.error('could not insert new wallet to database')
        return null
    } 
}

const getTransactions = async() => {
    const transactions = await TransactionModel.find({});
    return transactions
}

const getTransaction =  async (tx) => {
    const transaction = await TransactionModel.findOne({tx: tx});
    return transaction
}

const getUserTransactions = async(id) => {
    const fromTransactions = await TransactionModel.find({from: id.toString()});
    const toTransactions = await TransactionModel.find({to: id.toString()});
    let transactions = fromTransactions.concat(toTransactions)
    return transactions

}

const getWallets =  async() => {
    const wallets = await WalletModel.find({});
    return wallets
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
    getUserTransactions
};
