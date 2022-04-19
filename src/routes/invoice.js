const route = require("express").Router();
const { getAllInvoices, getInvoicebyID } = require('../controllers/Invoice');
const verify_admin_token = require('../controllers/verify_admin_token.js');

route.get("/", verify_admin_token, getAllInvoices);
route.get("/:invoiceID", verify_admin_token, getInvoicebyID);

module.exports = route;
