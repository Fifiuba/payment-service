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
      return contractInteraction.sendPayment(walletService.getWalletFromProvider(req.body.receiverId), req.body.amountInEthers);
    };
  }
  
  module.exports = { schema, handler };