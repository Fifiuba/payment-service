const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");
const {paymentsDatabase} = require('./database/database');
require('dotenv').config();

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

// Declares routes
routes.forEach(route => fastify.route(route({ config, services })));

//connect to db
const db = new paymentsDatabase();
db.connectDB()

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0');
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
