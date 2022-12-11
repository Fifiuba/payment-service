const ethers = require("ethers");
const getDepositHandler = require("../handlers/getDepositHandler");
const {
  saveTransaction,
  getTransaction,
  getTransactions} = require('./databaseInteraction') ;

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const deposit = ({ config }) => async (senderWallet, amountToSend) => {
  const basicPayments = getContract(config, senderWallet);
  const tx = await basicPayments.deposit({
    value: ethers.utils.parseEther(amountToSend).toHexString(),
  });
  tx.wait(1).then(
    receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "DepositMade") {
        const transaction = {
          tx: tx.hash,
          from: tx.from,
          to: tx.to,
          amount: parseFloat(ethers.utils.formatEther(firstEvent.args.amount))
        }
        saveTransaction(transaction)
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


const sendPayment = ({ config }) => async (receiverWallet, amountToReceive,owner) => {
  const basicPayments = getContract(config, owner);
  const tx = await basicPayments.sendPayment(receiverWallet, ethers.utils.parseEther(amountToReceive));
  tx.wait(1).then(
    receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "PaymentMade") {
        const transaction = {
          tx: tx.hash,
          from: tx.from,
          to: tx.to,
          amount: firstEvent.args.amount
        }
        saveTransaction(transaction)
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
  return await getTransaction(depositTxHash)
};



module.exports = dependencies => ({
  deposit: deposit(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
  sendPayment: sendPayment(dependencies)
});
