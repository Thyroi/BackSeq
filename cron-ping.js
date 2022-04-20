var CronJob = require('cron').CronJob;
const { imprimir } = require('./src/controllers/Offers');
const cronito = {
    // minutero: new CronJob('* * * * *', function () {
    //     console.log('minuto: ' + new Date());
    // }, null, true, 'America/Buenos_Aires'),
    // segundero: new CronJob('* * * * * *', function () {
    //     console.log('segundo: ' + new Date());
    // }, null, true, 'America/Buenos_Aires')
    // segundero: new CronJob('* * * * * *', function () {
    //     imprimir();
    // }, null, true, 'America/Buenos_Aires'),
}

module.exports = cronito;