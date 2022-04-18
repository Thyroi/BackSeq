const jwt = require('jsonwebtoken');
const route = require("express").Router();
const { Client } = require('../db.js');
require('dotenv').config();


route.post('/', async (req, res) => {
  const {login_name} = req.body;
  const client = await Client.findOne({
    where: {
      login_name: login_name
    }
  });
  jwt.sign({client}, process.env.SECRET_KEY, (err, token) => {
    res.json({token, client});
  })
});

module.exports = route;
