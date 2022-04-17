const axios = require('axios');
const crypto = require('crypto');
const { Sequelize, Op } = require('sequelize');
const { Client, Cart, Review } = require('../db.js');
const sendMail = require('./Mailer.js');

const client = {
  addClient: async (req, res) => {
    try {
      const { phone, email, login_name, login_password, name, lastname, address } = req.body;
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
        let update =await Client.update({
          login_name:login_name,
          login_password:login_password,
          isRegistered:true,
        }, {where:{phone:phone}}
        )
      };
      if (createdClient[1] && login_password) {
        let info = {
          type: 'confirmation',
          email: email,
          token: createdClient[0].token
        }
        await sendMail(info);
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
    const { email } = req.query;
    try {
      const client = await Client.findOne({
        where: { email: email }
      });
      if (client) {
        client.token = crypto.createHash('md5').update(client.token).digest('hex')
        client.save();
        let info = {
          type: 'reset',
          email: client.email,
          token: client.token
        }
        sendMail(info);
        return res.status(200).send("Correo de reseteo enviado.");
      }else{
        return res.status(404).send("Cliente no encontrado.");
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
  getClientbyEmail: async (req, res) => {
    try {
      const {email} = req.query;
      if(!email) return { msg: 'provide e-mail.'};
      const tClient = await Client.findOne({
        where: { 
          isRegistered: true,
          email: email
        }
      });
      return tClient
        ? res.status(200).json({msg: `Client found`, client: tClient})
        : res.status(404).json({msg: `Client not found`});
    }
    catch (error) {
      console.log("ERROR_en_getClientbyEmail__________\n"+error);
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
      res.status(200).send("Cliente actualizado");
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
