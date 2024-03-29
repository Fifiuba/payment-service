const getWalletData = require("./handlers/getWalletHandler");
const getWalletsData = require("./handlers/getWalletsHandler");
const createWallet = require("./handlers/createWalletHandler");
const createDeposit = require("./handlers/createDepositHandler");
const createPayment = require("./handlers/createPayHandler");
const getDeposit = require("./handlers/getDepositHandler");
const getInfo = require("./handlers/getInfoHandler");
const getTransactionData = require("./handlers/getTransactionHandler");
const getTransactionsData = require("./handlers/getTransactionsHandler");
const getWalletBalance = require("./handlers/getWalletBalanceHandler");
const deleteWallet = require("./handlers/deleteWalletHandler");

function getInfoRoute({ config }) { 
  return {
    method: "GET",
    url: "/",
    schema: getInfo.schema(config),
    handler: getInfo.handler(),
  };
}

function getWalletDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/payment/wallet/:id",
    schema: getWalletData.schema(config),
    handler: getWalletData.handler({ config, ...services }),
  };
}

function getWalletsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/payment/wallet",
    schema: getWalletsData.schema(config),
    handler: getWalletsData.handler({ config, ...services }),
  };
}

function createWalletRoute({ services, config }) {
  return {
    method: "POST",
    url: "/payment/wallet",
    schema: createWallet.schema(config),
    handler: createWallet.handler({ config, ...services }),
  };
}

function createDepositRoute({ services, config }) {
  return {
    method: "POST",
    url: "/payment/deposit",
    schema: createDeposit.schema(config),
    handler: createDeposit.handler({ config, ...services }),
  };
}

function createPaymentRoute({ services, config }) {
  return {
    method: "POST",
    url: "/payment/pay",
    schema: createPayment.schema(config),
    handler: createPayment.handler({ config, ...services }),
  };
}

function getDepositRoute({ services, config }) {
  return {
    method: "GET",
    url: "/payment/deposit/:txHash",
    schema: getDeposit.schema(config),
    handler: getDeposit.handler({ config, ...services }),
  };
}

function getTransactionDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/payment/transaction/:id",
    schema: getTransactionData.schema(config),
    handler: getTransactionData.handler({ config, ...services }),
  };
}

function getTransactionsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/payment/transaction",
    schema: getTransactionsData.schema(config),
    handler: getTransactionsData.handler({ config, ...services }),
  };
}

function getWalletBalanceRoute({ services, config }) {
  return {
    method: "GET",
    url: "/payment/wallet/balance/:id",
    schema: getWalletBalance.schema(config),
    handler: getWalletBalance.handler({ config, ...services }),
  };
}

function deleteWalletRoute({ services, config }) {
  return {
    method: "DELETE",
    url: "/payment/wallet/:id",
    schema: deleteWallet.schema(config),
    handler: deleteWallet.handler({ config, ...services }),
  };
}

module.exports = [getWalletDataRoute, 
  getWalletsDataRoute, 
  createWalletRoute, 
  createDepositRoute, 
  getDepositRoute, 
  getInfoRoute, 
  createPaymentRoute,
  getTransactionDataRoute,
  getTransactionsDataRoute,
  getWalletBalanceRoute, 
  deleteWalletRoute]
