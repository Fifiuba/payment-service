const { getWallet } = require("../services/databaseInteraction");

function schema() {
    return {
      params: {
        type: "object",
        properties: {
          receiverId: {
            type: "integer",
          },
          amountInEthers: {
            type: "string",
          },
        },
      },
      required: ["receiverId", "amountInEthers"],
    };
  }
  
  function handler({ contractInteraction, walletService }) {
    return async function (req) {
      const ownerWallet =  walletService.getDeployerWallet(); 
      const wallet = await getWallet(req.body.receiverId)
      return contractInteraction.sendPayment(wallet.address, req.body.amountInEthers,ownerWallet);
    };
  }
  
  module.exports = { schema, handler };