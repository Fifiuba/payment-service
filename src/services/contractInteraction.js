const ethers = require("ethers");
const getDepositHandler = require("../handlers/getDepositHandler");
//const databaseInteraction = require('./databaseInteraction')

const getContract = (config, wallet) => {
  console.log(config)
  console.log(wallet)
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const deposits = {};

const deposit = ({ config }) => async (senderWallet, amountToSend) => {
  const basicPayments = await getContract(config, senderWallet);
  const tx = await basicPayments.deposit({
    value: await ethers.utils.parseEther(amountToSend).toHexString(),
  });
  tx.wait(1).then(
    receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "DepositMade") {
        // TODO: guardar en bd
        //databaseInteraction.saveTransaction(tx)
        deposits[tx.hash] = {
          senderAddress: firstEvent.args.sender,
          amountSent: firstEvent.args.amount,
        };
      } else {
        console.error(`Payment not created in tx ${tx.hash}`);
      }
    },
    error => {
      const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
      const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
      console.error("reasons List");
      console.error(reasonsList);

        console.error("message");
        console.error(message);
      },
    );
    return tx;
  };


const sendPayment = ({ config }) => async (receiverWallet, amountToReceive) => {
  const basicPayments = await getContract(config, receiverWallet);
  console.log(`receiver addres: ${receiverWallet.address}`)
  console.log(`amount to receive: ${amountToReceive}`)
  console.log('ethers to hex string ' + await ethers.utils.parseEther(amountToReceive).toHexString())
  const tx = await basicPayments.sendPayment({
    value: await ethers.utils.parseEther(amountToReceive).toHexString(),
  });
  console.log(`basic payments: ${tx}`)
  console.log('hexString pasa bien')

  tx.wait(1).then(
    receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "PaymentMade") {
        // TODO: guardar en bd con el formato correcto
        //databaseInteraction.saveTransaction(tx)
        console.log('llego bien hasta hacer el pago')
        deposits[tx.hash] = {
          senderAddress: firstEvent.args.sender,
          amountSent: firstEvent.args.amount,
        };
      } else {
        console.error(`Payment not created in tx ${tx.hash}`);
      }
    },
    error => {
      const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
      const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
      console.error("reasons List");
      console.error(reasonsList);

      console.error("message");
      console.error(message);
    },
  );
  return tx;
};


const getDepositReceipt = ({}) => async depositTxHash => {
  //return databaseInteraction.getTransaction(depositTxHash)
  return deposits[depositTxHash];
};



module.exports = dependencies => ({
  deposit: deposit(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
  sendPayment: sendPayment(dependencies)
});
