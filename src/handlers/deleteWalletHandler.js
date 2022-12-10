const { deleteWallet } = require("../services/databaseInteraction");

function schema() {
    return {
      params: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
        },
      },
      required: ["id"],
    };
  }
  
  function handler() {
    return async function (req, reply) {
      await deleteWallet(req.params.id); 
      reply.code(200);
    };
  }
  
  module.exports = { handler, schema };