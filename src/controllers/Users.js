const axios = require('axios');
const { Sequelize, Op } = require('sequelize');
const { Users } = require('../db.js');

const user = {
  addUser: async (req, res) => {
    try {
      const { user_name, user_password, rol } = req.body;
      const createdUser = Users.create({user_name, user_password, rol});
      res.status(200).send("Usuario creado de manera Exitosa!!");
    }
    catch (error) {
      console.log(error);
    }
  }
}

module.exports = user;
