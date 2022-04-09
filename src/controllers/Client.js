const axios = require('axios');
const crypto = require('crypto');
const { Sequelize, Op } = require('sequelize');
const { Client, Cart, Review } = require('../db.js');
const sendMail = require('./Mailer.js');

// const hash=(string)=>{
//   let characters= string.slice(0,-4).split("");
//   return characters.reduce((h,c)=>(h=c.charCodeAt(0)+(h<<6)+(h<<16)-h), 0);
// }

const client = {
  addClient: async (req, res) => {
    try {
      const { phone, email, login_name, login_password, name, lastname, address } = req.body;
      let token = crypto.createHash('md5').update(Date.now().toString).digest('hex');
      const createdClient = await Client.findOrCreate({
        where: { phone: phone },
        defaults: {
          phone,
          email,
          login_name,
          login_password,
          name,
          lastname,
          address,
          isRegistered: login_name ? true : false,
          token
        }
      });
      if (createdClient) {
        sendMail(email, token)
      }
      let newCart = await Cart.create();
      newCart.setClient(phone);
      res.status(200).send(createdClient[1] === true ? "Cliente creado de manera Exitosa!!" : "Ese  cliente ya existe");

    }
    catch (error) {
      console.log(error);
    }
  },
  verify: async (req, res) => {
    try {
      const { token } = req.query;
      const client = await Client.findOne({
        where: { token: token }
      });
      if (client) {
        client.isVerified = true;
        client.save();
        res.status(200).send("Cliente verificado de manera exitosa!!");
      }
      else {
        res.status(404).send("Cliente no encontrado");
      }
    }
    catch (error) {
      console.log(error);
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { phone } = req.body;
      const client = await Client.findOne({
        where: { phone: phone }
      });
      console.log(client);
      if (client) {
        client.token = crypto.createHash('md5').update(client.token).digest('hex')
        client.save();
        sendMail(client.email, client.token);
        return res.status(200).json(client);
      }
    } catch(error){
      console.log(error);
    }
  },
        
  getClientbyID: async (req, res) => {
    try {
      const id = req.params.id;
      // const id = req.params.email;
      const getclientid = await Client.findOne({
        where: { phone: id },
        include: [{
          model: Review
        }]
      });
      res.status(200).json(getclientid).send("Cliente encontrado");
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
    console.log(req.body)
    try {
      const id = req.params.id;
      const info = req.body;
      const updatedclient = await Client.update(info,
        {
          where: { phone: id }
        });



      res.status(200).json(updatedclient).send("Cliente actualizado");
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;
      const deleteClient = await Client.destroy({
        where: { phone: id }
      });

      console.log(deleteClient);
      console.log("Cliente eliminado con Exito!!");
      res.status(200).send("Cliente eleiminado con Exito!!");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = client;
