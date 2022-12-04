
const {saveTransaction,saveWallet,getTransaction,getTransactions,getWallet,getWallets,getUserTransactions} = require('../src/services/databaseInteraction') ;
const {connectDB, dropDB, dropCollections} = require('./testDatabase/testDatabase');

describe('Database interaction', () => {
    beforeAll(async () => {
        await connectDB();
      });
    
      afterAll(async () => {
        await dropDB();
      });
    
      afterEach(async () => {
        await dropCollections();
      });

    describe('Wallet Collection CRUD functions',() => {
    
        it('should create a new wallet and save it correctly', async() => {
            const wallet = {
                user_id: 1,
                address: 'fake_address',
                privateKey: 'fake_private_key',
            }
            
            const savedWallet = await saveWallet(wallet);

            expect(savedWallet.user_id).toBe(1);
            expect(savedWallet.address).toBe('fake_address');
            expect(savedWallet.privateKey).toBe('fake_private_key');

        });


        it('should create a new wallet', async() => {
            const wallet = {
                user_id: 1,
                address: 'fake_address',
                privateKey: 'fake_private_key',
            }
            
            await saveWallet(wallet);
            const returnedWallet = await getWallet(wallet.user_id);

            expect(returnedWallet.user_id).toBe(1);
            expect(returnedWallet.address).toBe('fake_address');
            expect(returnedWallet.privateKey).toBe('fake_private_key');

        });


        it('should return the first created wallet if another one is created with the same user_id', async() => {
            const wallet = {
                user_id: 1,
                address: 'fake_address',
                privateKey: 'fake_private_key',
            }
            const repeatedWallet = {
                user_id: 1,
                address: 'other_fake_address',
                privateKey: 'other_fake_private_key',
            }
            
            const savedWallet = await saveWallet(wallet);
            const savedRepeatedWallet = await saveWallet(repeatedWallet);

            expect(savedRepeatedWallet._id.toString()).toBe(savedWallet._id.toString());
            expect(savedRepeatedWallet.user_id).toBe(savedWallet.user_id);
            expect(savedRepeatedWallet.address).toBe(savedWallet.address);
            expect(savedRepeatedWallet.privateKey).toBe(savedWallet.privateKey);
        });

        
        it('should not create a new wallet if user_id is not specified', async() => {
            const wallet = {
                address: 'fake_address',
                privateKey: 'fake_private_key',
            }
            
            const savedWallet = await saveWallet(wallet);
            expect(savedWallet).toEqual(null);
        });


        it('should return all saved wallets', async() => {
            const wallet1 = {
                user_id: 1,
                address: 'fake_address',
                privateKey: 'fake_private_key',
            }

            const wallet2 = {
                user_id: 2,
                address: 'fake_address',
                privateKey: 'fake_private_key',
            }

            const wallet3 = {
                user_id: 3,
                address: 'fake_address',
                privateKey: 'fake_private_key',
            }
            
            await saveWallet(wallet1);
            await saveWallet(wallet2);
            await saveWallet(wallet3);

            const returnedWallets = await getWallets();
            const expectedWallets = [wallet1, wallet2, wallet3];

            expect(returnedWallets.length).toBe(3);
            expect(returnedWallets).toMatchObject(expectedWallets);
        });

    });

    describe('Transaction Collection CRUD functions',() => {
        it('should create a new transaction and save it correctly', async() => {
            const transaction = {
                tx: '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4a6da9b56c',
                from: "1",
                to: "2",
                amount: "10"
            }
            
            const savedTransaction = await saveTransaction(transaction);

            expect(savedTransaction.tx).toBe('0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4a6da9b56c');
            expect(savedTransaction.from).toBe("1");
            expect(savedTransaction.to).toBe("2");
            expect(savedTransaction.amount).toBe("10");

        });

        it('should create a new transaction', async() => {
            const transaction = {
                tx: '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4a6da9b56c',
                from: "1",
                to: "2",
                amount: "10"
            }
            
            await saveTransaction(transaction);
            const returnedTransaction = await getTransaction(transaction.tx)
            expect(returnedTransaction.tx).toBe('0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4a6da9b56c');
            expect(returnedTransaction.from).toBe("1");
            expect(returnedTransaction.to).toBe("2");
            expect(returnedTransaction.amount).toBe("10");

        });

        it('should not create a new transaction if transaction hash is not specified', async() => {
            const transaction = {
                from: "1",
                to: "2",
                amount: "10"
            }
            
            const savedTransaction = await saveTransaction(transaction);
            expect(savedTransaction).toEqual(null);
        });


        it('should return the first created transaction if another one is created with the same transaction hash', async() => {
            const transaction = {
                tx: '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4a6da9b56c',
                from: "1",
                to: "2",
                amount: "10"
            }
            const repeatedTransaction = {
                tx: '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4a6da9b56c',
                from: "5",
                to: "7",
                amount: "100"
            }
            
            const savedTransaction = await saveTransaction(transaction);
            const savedRepeatedTransaction = await saveTransaction(repeatedTransaction);

            expect(savedRepeatedTransaction._id.toString()).toBe(savedTransaction._id.toString());
            expect(savedRepeatedTransaction.tx).toBe(savedTransaction.tx);
            expect(savedRepeatedTransaction.from).toBe(savedTransaction.from);
            expect(savedRepeatedTransaction.to).toBe(savedTransaction.to);
            expect(savedRepeatedTransaction.amount).toBe(savedTransaction.amount);

        });

        it('should return all saved transactions', async() => {
            const transaction1 = {
                tx: '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4a6da9b56c',
                from: "1",
                to: "2",
                amount: "10"
            }
            const transaction2 = {
                tx: '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4p0oa9b56c',
                from: "5",
                to: "7",
                amount: "100"
            }
            const transaction3 = {
                tx: '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4r5ta9b56c',
                from: "5",
                to: "7",
                amount: "102"
            }
            
            await saveTransaction(transaction1);
            await saveTransaction(transaction2);
            await saveTransaction(transaction3);

            const returnedTransactions = await getTransactions();
            const expectedTransactions = [transaction1, transaction2, transaction3];

            expect(returnedTransactions.length).toBe(3);
            expect(returnedTransactions).toMatchObject(expectedTransactions);
        });

        it('should return zero transactions for a user that did not make any', async() => {
           
            const transactions = await getUserTransactions(1);
            expect(transactions.length).toBe(0);
        });

        it('should return transactions for a user', async() => {
            const transaction1 = {
                tx: '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4a6da9b56c',
                from: "1",
                to: "2",
                amount: "10"
            }
            const transaction2 = {
                tx: '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4p0oa9b56c',
                from: "5",
                to: "1",
                amount: "100"
            }
            const transaction3 = {
                tx: '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4r5ta9b56c',
                from: "5",
                to: "7",
                amount: "102"
            }

            await saveTransaction(transaction1);
            await saveTransaction(transaction2);
            await saveTransaction(transaction3);

            const returnedTransactions = await getUserTransactions(1);
            const expectedTransactions = [transaction1, transaction2];

            expect(returnedTransactions.length).toBe(2);
            expect(returnedTransactions).toMatchObject(expectedTransactions);
        });
    });
});