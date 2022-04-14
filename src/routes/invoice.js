const route = require("express").Router();
const { getAllInvoices, getInvoicebyID } = require('../controllers/Invoice');

route.get("/",getAllInvoices);
route.get("/:id",getInvoicebyID);

module.exports = route;
