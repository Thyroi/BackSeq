const axios = require('axios');
const { Sequelize, Op } = require('sequelize');
const { Users } = require('../db.js');

const user = {
  addUser: async (req, res) => {
    try {
      const { user_name, user_password, rol } = req.body;
      const createdUser = await Users.create({user_name, user_password, rol});
      res.status(200).send("Usuario creado de manera Exitosa!!");
    }
    catch (error) {
      console.log(error);
    }
  },
  getUserbyID: async (req, res) => {
    try {
      const id = req.params.id_user;
      const getuserid = await Users.findOne({
        where: {id_user: id}
      });
      res.status(200).json(getuserid);
    }
    catch (error) {
      console.log(error);
    }
  },
  getAllUser: async (req, res) => {
    try {
      const getuser = await Users.findAll();
      res.status(200).json(getuser);
    }
    catch (error) {
      console.log(error);
    }
  },
  updateUserRol: async (req, res) => {
    try {
      const userID = req.query.id_user;
      const updatedRol = await Users.update(req.body, {
        where: { id_user: userID }
      });
      console.log("Rol de usuario actualizado con Exito!!");
      res.status(200).json("Rol de usuario actualizado con Exito!!");
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const userID = req.params.id_user;
      const deleteUser = await Users.destroy({
        where: { id_user: userID }
      });
      console.log("Empleado eleiminado con Exito!!");
      res.status(200).send("Empleado eleiminado con Exito!!");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = user;
