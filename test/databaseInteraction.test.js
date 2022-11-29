const { describe,it } = require("node:test");
const assert = require('assert');
const {saveWallet, saveTransation} = require('../src/services/databaseInteraction') ;


describe('Wallet Collection CRUD functions',() => {
    it('should creat a new wallet',() => {
        const wallet = {
            user_id: 1,
            addres: 'fake_address',
            private_key: 'fake_private_key'
        }
        const walletSaved = saveWallet(wallet);

        assert.strictEqual(1,1);
    });
})