const axios = require('axios');
const { Sequelize, Op } = require('sequelize');
const { Users } = require('../db.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const user = {
  addUser: async (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
      if(error){
        res.status(403).send({message:"Forbidden Access"});
      } else {
        try {
          const { user_name, user_password, rol } = req.body;
          const createdUser = await Users.create({user_name, user_password, rol});
          res.status(200).json({createdUser, message:"Authorized Access", authData});
        }
        catch (error) {
          console.log(error);
        }
      }
    })

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
    jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
      if(error){
        res.status(403).send({message:"Forbidden Access"});
      } else {
        try {
              const userID = req.body.id_user;
              const updatedRol = await Users.update(req.body, {
                where: { id_user: userID }
              });
              console.log("Rol de usuario actualizado con Exito!!");
              res.status(200).json({updatedRol, message:"Authorized Access", authData});
            } catch (error) {
                console.log(error);
          }
      }
    })
  },
  deleteUser: async (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
      if(error){
        res.status(403).send({message:"Forbidden Access"});
      } else {
        res.json()
        try {
              const userID = req.body.id_user;
              const deleteUser = await Users.destroy({
                where: { id_user: userID }
              });
            console.log("Empleado eleiminado con Exito!!");
            res.status(200).json({deleteUser, message:"Authorized Access", authData});
        } catch (error) {
            console.log(error);
        }
      }
    })

  }
}

module.exports = user;
