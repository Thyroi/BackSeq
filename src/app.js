const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
require('dotenv').config();
const mercadopago = require("mercadopago");
const cors = require("cors");

require('./db.js');

const server = express();

server.name = 'FRAILEJON ERNESTO PEREZ';

server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

server.use('/', routes);

server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

server.post("/process-payment", (req, res) => {
    mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN_MP);
    const payment_data = {
        transaction_amount: req.body.transaction_amount,
        token: req.body.token,
        description: req.body.description,
        installments: Number(req.body.installments),
        payment_method_id: req.body.paymentMethodId,
        issuer_id: req.body.issuer,
        payer: {
            email: req.body.payer.email,
            identification: {
                type: req.body.payer.docType,
                number: req.body.payer.docNumber,
            },
        },
    };

    mercadopago.payment
        .save(payment_data)
        .then((response) => {
            return res.status(response.status).json({
                id: response.body.id,
                status: response.body.status,
                status_detail: response.body.status_detail,
            });
        })
        .catch((err) => {
            return res.status(500).send(err);
        });
});

module.exports = server;
