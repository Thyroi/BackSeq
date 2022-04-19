const jwt = require('jsonwebtoken');
const route = require("express").Router();
const { Client, Users } = require('../db.js');
require('dotenv').config();


route.post('/', async (req, res) => {
  const {login_name} = req.body;
  const client = await Client.findOne({
    where: {
      login_name: login_name
    }
  });
  if(client){
    jwt.sign({client}, process.env.SECRET_KEY, (err, token) => {
      res.json({token, client});
    })
  } else {
    res.json({message: "Incorrect login name or password"});
}
});

route.post('/admin', async (req, res) => {
  const {user_name} = req.body;
  const user = await Users.findOne({
    where: {
      user_name: user_name
    }
  });
  if(user) {
    jwt.sign({user}, process.env.SECRET_KEY, (err, token) => {
      res.json({token, user});
    })
  } else {
    res.json({message: "Incorrect user or password"});
  }
});

module.exports = route;
