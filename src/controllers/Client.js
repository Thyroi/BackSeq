const axios = require('axios');
const { Sequelize, Op } = require('sequelize');
const { Client, Cart } = require('../db.js');

const client = {
  addClient: async (req, res) => {
    try {
      const { phone, email, login_name, login_password, name, lastname, address } = req.body;
        /* const createdClient = await Client.create({
            phone,
            email,
            login_name,
            login_password,
            name,
            lastname,
            address,
            isRegistered:login_name !==""? true:false,
          }); */
          const createdClient = await Client.findOrCreate({
            where:{phone:phone},
            defaults:{
            phone,
            email,
            login_name,
            login_password,
            name,
            lastname,
            address,
            isRegistered:login_name? true:false,
          }});

          console.log(createdClient);
      let newCart=await Cart.create();
      newCart.setClient(phone);
  
    
      res.status(200).send(createdClient[1]===true?"Cliente creado de manera Exitosa!!":"Ese  cliente ya existe");

    }
    catch (error) {
      console.log(error);
    }
  },

  getClientbyID: async (req, res) => {
    try {
      const id = req.params.id;
     // const id = req.params.email;
      const getclientid = await Client.findOne({
        where: {phone: id}
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
     const info=req.body;
      const updatedclient = await Client.update(info,
        {
        where: { phone: id }
      });
    
     
    
      res.status(200).json(updatedclient).send("Cliente actualizado");
    } catch(error) {
      console.log(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = req.params.phone;
      const deleteClient = await Client.destroy({
        where: { phone: id } 
      });
      console.log("Cliente eliminado con Exito!!");
      res.status(200).send("Cliente eleiminado con Exito!!");
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = client;
