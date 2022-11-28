function schema() {
    return {
      params: {},
    };
}
  
function handler() {
  return async function (req, reply) {
    const body = {
        'service': 'Payment service!',
        'description': 'This service is responsable for making correct transactions',
        'created_on': '01-11-2022'
    }
    reply.code(200).send(body);
  };
}

module.exports = { handler, schema };