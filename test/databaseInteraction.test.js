
const {saveTransaction,saveWallet,getTransaction,getTransactions,getWallet,getWallets} = require('../src/services/databaseInteraction') ;
const {connectDB, dropDB, dropCollections} = require('./testDatabase/testDatabase');


describe('Wallet Collection CRUD functions',() => {
    beforeAll(async () => {
        await connectDB();
      });
    
      afterAll(async () => {
        await dropDB();
      });
    
      afterEach(async () => {
        await dropCollections();
      });


    it('should create a new wallet and save it correctly', async() => {
        const wallet = {
            user_id: 1,
            address: 'fake_address',
            privateKey: 'fake_private_key',
            amount:10
        }
        
        const savedWallet = await saveWallet(wallet);

        expect(savedWallet.user_id).toBe(1);
        expect(savedWallet.address).toBe('fake_address');
        expect(savedWallet.privateKey).toBe('fake_private_key');
        expect(savedWallet.amount).toBe(10);

    });


    it('should create a new wallet', async() => {
        const wallet = {
            user_id: 1,
            address: 'fake_address',
            privateKey: 'fake_private_key',
            amount:10
        }
        
        await saveWallet(wallet);
        const returnedWallet = await getWallet(wallet.user_id);

        expect(returnedWallet.user_id).toBe(1);
        expect(returnedWallet.address).toBe('fake_address');
        expect(returnedWallet.privateKey).toBe('fake_private_key');
        expect(returnedWallet.amount).toBe(10);

    });


    it('should the first created wallet', async() => {
        const wallet = {
            user_id: 1,
            address: 'fake_address',
            privateKey: 'fake_private_key',
            amount:10
        }
        const repeatedWallet = {
            user_id: 1,
            address: 'other_fake_address',
            privateKey: 'other_fake_private_key',
            amount:500
        }
        
        const savedWallet = await saveWallet(wallet);
        const savedRepeatedWallet = await saveWallet(repeatedWallet);

        expect(savedRepeatedWallet._id.toString()).toBe(savedWallet._id.toString());
        expect(savedRepeatedWallet.user_id).toBe(1);
        expect(savedRepeatedWallet.amount).toBe(10);
        expect(savedRepeatedWallet.address).toBe('fake_address');
        expect(savedRepeatedWallet.privateKey).toBe('fake_private_key');
    });

    
    it('should not create a new wallet if user_id is not specified', async() => {
        const wallet = {
            address: 'fake_address',
            privateKey: 'fake_private_key',
            amount:10
        }
        
        await saveWallet(wallet);
        const returnedWallet = await getWallet(wallet.user_id);
        expect(returnedWallet).toEqual(null);
    });


    it('should return all saved wallets', async() => {
        const wallet1 = {
            user_id: 1,
            address: 'fake_address',
            privateKey: 'fake_private_key',
            amount:10
        }

        const wallet2 = {
            user_id: 2,
            address: 'fake_address',
            privateKey: 'fake_private_key',
            amount:10
        }

        const wallet3 = {
            user_id: 3,
            address: 'fake_address',
            privateKey: 'fake_private_key',
            amount:10
        }
        
        await saveWallet(wallet1);
        await saveWallet(wallet2);
        await saveWallet(wallet3);

        const returnedWallets = await getWallets();
        const expectedWallets = [wallet1, wallet2, wallet3];

        expect(returnedWallets.length).toBe(3);
        expect(returnedWallets).toMatchObject(expectedWallets);
    });

})