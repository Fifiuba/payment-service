function schema() {
  return {
    params: {
      type: "object",
      properties: {
        senderId: {
          type: "integer",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["senderId", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    const wallet = await walletService.getWalletFromProvider(req.body.senderId)
    return contractInteraction.deposit(wallet, req.body.amountInEthers);
  };
}

module.exports = { schema, handler };
