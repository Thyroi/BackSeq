const axios = require('axios');
const { Sequelize, Op } = require('sequelize');
const { Invoice } = require('../db.js');

const invoice = {
  getAllInvoices: async (req, res) => {
    try {
      const getinvoice = await Invoice.findAll();
      res.status(200).json(getinvoice);
    } catch (error) {
      console.log(error);
    }
  },
  getInvoicebyID: async (req, res) => {
    try {
      const {invoiceID} = req.params;
      const getinvoiceID = await Invoice.findOne({
        where: {invoiceID: invoiceID}
      });
      res.status(200).json(getinvoiceID);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = invoice;
