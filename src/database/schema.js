const mongoose = require('mongoose');
const {Schema} = mongoose;

// Each schema maps to a MongoDB collection and defines
// the shape of the documents within that collection
const WalletSchema = new Schema({
    user_id: {type: Number, required: true},
    address: String,
    privateKey: String,
}, {
    versionKey: false, // You should be aware of the outcome after set to false
});

const TransactionSchema = new Schema({
    tx: {type: String, required: true},
    from: String,
    to: String,
    amount: String
}, {
    versionKey: false, // You should be aware of the outcome after set to false
});

// To use our schema definition, we need to convert it
// into a Model we can work with Instances of Models are documents
const WalletModel = mongoose.model('Wallet', WalletSchema);
const TransactionModel = mongoose.model('Transaction', TransactionSchema);


module.exports = {WalletModel,TransactionModel};