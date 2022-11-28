const mongoose = require('mongoose');
const {Schema} = mongoose;

// Each schema maps to a MongoDB collection and defines
// the shape of the documents within that collection
const WalletSchema = new Schema({
    user_id: Number,
    address: String,
    privateKey: String
});

// To use our schema definition, we need to convert it
// into a Model we can work with Instances of Models are documents
const WalletModel = mongoose.model('Wallet', WalletSchema);

module.exports = {WalletModel};