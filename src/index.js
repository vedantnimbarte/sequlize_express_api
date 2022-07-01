
require('dotenv').config();
const http = require('http');
const app = require('./connection/express.connection');
const sequelize = require('./database/index');
const PORT = process.env.APP_PORT;

async function assertDatabaseConnectionOk() {
  console.log(`Checking database connection...`);
  try {
    await sequelize.authenticate();
    console.log('Database connection OK!');
  } catch (error) {
    console.log('Unable to connect to the database:');
    console.log(error.message);
    process.exit(1);
  }
}

async function init() {
  await assertDatabaseConnectionOk();

  console.log(`Starting Sequelize + Express example on port ${PORT}...`);

  var httpServer = http.createServer(app);
  httpServer.listen(PORT, () => {
    console.log("HTTP Server running on port ", `${PORT}`);
  });
}

init();

