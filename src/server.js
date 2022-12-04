const {PaymentsDatabase} = require('./database/database');
require('dotenv').config();
const {buildApp} = require('./app')

const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0');
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

const fastify = buildApp();
//connect to db
const db = new PaymentsDatabase();
db.connectDB()
// Run the server!
start();
