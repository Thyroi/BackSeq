const route = require("express").Router();
const { getAllInvoices, getInvoicebyID } = require('../controllers/Invoice');

route.get("/",getAllInvoices);
route.get("/:invoiceID",getInvoicebyID);

module.exports = route;
