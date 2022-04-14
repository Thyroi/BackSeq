const route = require("express").Router();
const { getAllInvoices } = require('../controllers/Invoice');

route.get("/",getAllInvoices);

module.exports = route;
