const axios = require('axios');
const { Sequelize, Op } = require('sequelize');
const { Invoice } = require('../db.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const invoice = {
  getAllInvoices: async (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
      if(error){
        res.status(403).send({message:"Forbidden Access"});
      } else {
        try {
          const getinvoice = await Invoice.findAll();
          res.status(200).json({getinvoice, message:"Authorized Access", authData});
        } catch (error) {
          console.log(error);
        }
      }
    })
  },
  getInvoicebyID: async (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
      if(error){
        res.status(403).send({message:"Forbidden Access"});
      } else {
        try {
          const {invoiceID} = req.params;
          const getinvoiceID = await Invoice.findOne({
            where: {invoiceID: invoiceID}
          });
          res.status(200).json({getinvoiceID, message:"Authorized Access", authData});
        } catch (error) {
          console.log(error);
        }
      }
    })    
  }
}

module.exports = invoice;
