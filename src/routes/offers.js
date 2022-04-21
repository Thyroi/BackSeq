const route = require("express").Router();
const mailer = require("../controllers/Mailer");
const { getItems, genOffer, newOffer } = require('../controllers/Offers');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const verify_admin_token = require('../controllers/verify_admin_token.js');

route.patch("/setoff", verify_admin_token, async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async(error, authData) => {
    if(error){
      console.log(error);
      res.status(403).send({message:"Forbidden Access"});
    } else {
      const info = await getItems()
      const updated = await genOffer(info);
      return res.json(updated)
    }
  })
});
route.get("/email", verify_admin_token, async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async(error, authData) => {
    if(error){
      console.log(error);
      res.status(403).send({message:"Forbidden Access"});
    } else {
      let info = {type : "confirmation", discount: "10", email: "juanjo2895@hotmail.com"}
      const mail = await mailer(info);
      return res.json(mail)
    }
  })
});
route.patch("/newOffer", verify_admin_token, async (req, res) => {
  jwt.verify(req.token, process.env.SECRET_KEY, async(error, authData) => {
    if(error){
      console.log(error);
      res.status(403).send({message:"Forbidden Access"});
    } else {
      const info = req.body;
      const genOffer = await newOffer(info);
      return res.status(200).json("Las ofertas se han actualizado");
    }
  })
});
module.exports = route;
