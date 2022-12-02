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
    console.log('handler create wallet ')
    const body = await walletService.createWallet(req.body.user_id);
    
    if(!body) return reply.code(500).send({message:'Internal Server Error'});  
    return reply.code(201).send(body);
  };
}

module.exports = { handler, schema };
