const {saveTransaction,saveWallet, getWallet} = require('../src/services/databaseInteraction') ;
const {buildApp} = require('../src/app')
const {connectDB, dropDB, dropCollections} = require('./testDatabase/testDatabase');

describe('App tests', () => {
    
    beforeAll(async () => {
        await connectDB();
    });
    
    afterAll(async () => {
        await dropDB();
    });
    
    afterEach(async () => {
        await dropCollections();
    });

    it('GET request on saved wallets', async() => {
        const app = await buildApp();

        const wallet1 = {
            user_id: 1,
            address: 'first_fake_address',
            privateKey: 'first_fake_private_key',
        }

        const wallet2 = {
            user_id: 2,
            address: 'second_fake_address',
            privateKey: 'second_fake_private_key',
        }
        
        await saveWallet(wallet1);
        await saveWallet(wallet2);

        const response = await app.inject({
          method: 'GET',
          url: '/payment/wallet'
        })
        const expectedWallets = [wallet1, wallet2]
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.body).length).toBe(2)
        expect(JSON.parse(response.body)).toMatchObject(expectedWallets);
    })

    it('GET request on saved wallet by user_id returns it correctly', async() => {
        const app = await buildApp();

        const wallet1 = {
            user_id: 1,
            address: 'first_fake_address',
            privateKey: 'first_fake_private_key',
        }

        const wallet2 = {
            user_id: 2,
            address: 'second_fake_address',
            privateKey: 'second_fake_private_key',
        }
        
        await saveWallet(wallet1);
        await saveWallet(wallet2);

        const response = await app.inject({
          method: 'GET',
          url: '/payment/wallet/1'
        })
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.body).user_id).toBe(wallet1.user_id)
        expect(JSON.parse(response.body).address).toBe(wallet1.address)
        expect(JSON.parse(response.body).privateKey).toBe(wallet1.privateKey)  
    });

    it('GET request on saved transactions', async() => {
        const app = await buildApp();

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

        const response = await app.inject({
          method: 'GET',
          url: '/payment/transaction'
        })
        const expectedTransactions = [transaction1, transaction2, transaction3]
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.body).length).toBe(3)
        expect(JSON.parse(response.body)).toMatchObject(expectedTransactions);
    })
    
    it('GET request on saved transactions', async() => {
        const app = await buildApp();

        const transaction1 = {
            tx: '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4a6da9b56c',
            from: "1",
            to: "3",
            amount: "10"
        }
        const transaction2 = {
            tx: '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4p0oa9b56c',
            from: "3",
            to: "2",
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

        const response = await app.inject({
          method: 'GET',
          url: '/payment/transaction/3'
        })
        const expectedTransactions = [transaction1, transaction2]
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.body).length).toBe(2)
        expect(JSON.parse(response.body)).toMatchObject(expectedTransactions);
    });

    it ('POST wallet for user_id 1 should create it correctly', async () => {
        const app = await buildApp();

        const body = {
            user_id: 1
        }

        const response = await app.inject({
            method: 'POST',
            url: '/payment/wallet',
            payload: body
          })
        const expectedWalletInfo = ['address', 'privateKey']
        expect(response.statusCode).toBe(201)
        expect(JSON.parse(response.body).user_id).toBe(body.user_id)
        expect(Object.keys(JSON.parse(response.body))).toEqual(expect.arrayContaining(expectedWalletInfo));
    });

    it ('GET transaction receipt for a given tx should return it correctly', async () => {
        const app = await buildApp();

        const transaction = {
            tx: '0x2446f1fd773fbb9f080e674b60c6a033c7ed7427b8b9413cf28a2a4a6da9b56c',
            from: "1",
            to: "3",
            amount: "10"
        }

        await saveTransaction(transaction);

        const response = await app.inject({
            method: 'GET',
            url: `/payment/deposit/${transaction.tx}`,
          })
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.body)).toMatchObject(transaction)
    });

    xit('GET request balance on saved wallet', async() => {
        const app = await buildApp();
        
        const body = {
            user_id: 1
        }

        await app.inject({
            method: 'POST',
            url: '/payment/wallet',
            payload: body
        })

        const response = await app.inject({
            method: 'GET',
            url: '/payment/wallet/balance/1'
        })
        console.log(response)
        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.body).balance).toBe(0)
    });


    it('DELETE request on saved wallet', async() => {
        const app = await buildApp();

        const wallet = {
            user_id: 1,
            address: 'fake_address',
            privateKey: 'fake_private_key',
        }
        
        await saveWallet(wallet);

        const response = await app.inject({
          method: 'DELETE',
          url: '/payment/wallet/1'
        })

        expect(response.statusCode).toBe(200)
        expect(await getWallet(wallet.user_id)).toBe(null)
    });
    


})