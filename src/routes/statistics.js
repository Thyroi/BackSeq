const route = require("express").Router();
const {
    getSearchTerms,
    addSearchTerm,
    getOrders
 } = require('../controllers/Statistics');
 const verify_admin_token = require('../controllers/verify_admin_token.js');
 const jwt = require('jsonwebtoken');
 require('dotenv').config();

 route.get("/get", async (req, res) => {
    try {
        const response = await getOrders();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json("rompiste todo")
    }
  });

 route.get("/getSearchTerms", verify_admin_token, async (req, res) => {
   jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
     if(error){
       res.status(403).send({message:"Forbidden Access"});
     } else {
      try {
          const response = await getSearchTerms();
          return res.status(200).json(response);
      } catch (error) {
          return res.status(500).json("rompiste todo")
      }
    }
  })
});

 route.post("/addSearchTerm", verify_admin_token, async (req, res) => {
   jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
     if(error){
       res.status(403).send({message:"Forbidden Access"});
     } else {
     const { term } = req.query;
     console.log(term);
      try {
          const response = await addSearchTerm(term);
          return res.status(200).json(response);
      } catch (error) {
          return res.status(500).json("rompiste todo")
      }
    }
  })
});

module.exports = route;
