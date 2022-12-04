const { getUserTransactions } = require("../services/databaseInteraction");

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
      const body = await getUserTransactions(req.params.id); 
      reply.code(200).send(body);
    };
  }
  
  module.exports = { handler, schema };