const route = require("express").Router();
cosnt { getAllInvoices } = require('../controllers/Invoice');

route.get("/",getAllInvoices);

module.exports = route;
