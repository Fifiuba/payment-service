function schema() {
  return {
    body: {
      type:'object',
      properties:{
        user_id: {type: 'integer'}
      }
    },
    required: ["user_id"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const body = await walletService.createWallet(req.body.user_id);
    
    if(!body) return reply.code(500).send({message:'Internal Server Error'});  
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
