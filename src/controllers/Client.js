const axios = require('axios');
const crypto = require('crypto');
const { Sequelize, Op } = require('sequelize');
const { Client, Cart, Review } = require('../db.js');
const sendMail = require('./Mailer.js');

const client = {
  addClient: async (req, res) => {
    try {
      const { phone, email, login_name, login_password, name, lastname, address } = req.body;
      console.log(phone, "soy el phone que viene del front en addclient");
      let token = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
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

      if(!createdClient[1] && login_name){
        console.log(login_name, login_password);
        let update =await Client.update({
          login_name:login_name,
          login_password:login_password,
          isRegistered:true,
        }, {where:{phone:phone}}
        )
      };
      if (createdClient[1] && login_password) {
        sendMail(email, token)
      };
      let isThereCar=await Cart.findOne({
        where:{
           ClientPhone:phone}
   });
      if(login_name &&!isThereCar){
        let newCart = await Cart.create();
        newCart.setClient(phone);
      }
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
  },
  getClientBynick_pass: async (req, res) => {
    try {
      const login_name = req.query.login_name;
      const login_password = req.query.login_password;
      if((login_name === req.query.login_name && login_name !== 'Anonymous') && (login_password === req.query.login_password && login_password !== '')) {
      const encontrado = await Client.findOne({
        where: {
          login_name: login_name,
          login_password: login_password
        }
      });
        res.status(200).json(encontrado);
      } else {
        res.send("Cliente no encontrado");
      }
    }
    catch (error) {
      console.log(error);
    }
  }
}

module.exports = client;
