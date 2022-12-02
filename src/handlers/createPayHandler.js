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
      console.log(`request body: ${JSON.stringify(req.body)}`)
      const walletFromProvider = await walletService.getWalletFromProvider(req.body.receiverId);
      console.log(`la wallet from provider: ${walletFromProvider}`)
      return contractInteraction.sendPayment(walletFromProvider, req.body.amountInEthers);
    };
  }
  
  module.exports = { schema, handler };