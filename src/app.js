const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");


function buildApp(){
    // Require the framework and instantiate it
  const fastify = require("fastify")({ logger: true });

  // Declares routes
  routes.forEach(route => fastify.route(route({ config, services })));
  return fastify
}

module.exports = {buildApp}
