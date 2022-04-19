const server = require('./src/app.js');
const cronito = require('./cron-ping.js');
const { conn } = require('./src/db.js');
require('dotenv').config();

// Syncing all the models at once.
conn.sync({ force: false}).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('%s listening at 3001');
  });
},(e)=>console.log(e));
// cronito.segundero.start();
// cronito.minutero.start();