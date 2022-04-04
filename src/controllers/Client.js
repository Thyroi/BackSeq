const axios = require('axios');
const { Sequelize, Op } = require('sequelize');
const { Client } = require('../db.js');

const client = {
  addClient: async (req, res) => {
    try {
      const { phone, email, login_name, login_password, name, lastname, address } = req.body;
      const createdClient = await Client.create({
        phone,
        email,
        login_name,
        login_password,
        name,
        lastname,
        address});
      res.status(200).send("Cliente creado de manera Exitosa!!");
    }
    catch (error) {
      console.log(error);
    }
  },
  getClientbyID: async (req, res) => {
    try {
      const id = req.params.phone;
      const getclientid = await Client.findOne({
        where: {phone: id}
      });
      res.status(200).json(getclientid);
    }
    catch (error) {
      console.log(error);
    }
  },
  getAllClients: async (req, res) => {
    try {
      const getclients = await Client.findAll();
      res.status(200).json(getclients);
    }
    catch (error) {
      console.log(error);
    }
  },
  updateClient: async (req, res) => {
    try {
      const id = req.query.phone;
      const updatedclient = await Client.update(req.body, {
        where: { phone: id }
      });
      console.log("Cliente actualizado con Exito!!");
      res.status(200).json("Cliente actualizado con Exito!!");
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.phone;
      const deleteClient = await Client.destroy({
        where: { phone: id }
      });
      console.log("Cliente eleiminado con Exito!!");
      res.status(200).send("Cliente eleiminado con Exito!!");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = client;
