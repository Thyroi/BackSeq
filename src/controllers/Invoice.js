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
  }
}

model.exports = invoice;
