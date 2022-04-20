
const { Router } = require('express');
const {Cart, Client}=require ('../db');
const {createCart, updateCart, getCart, deleteCart}=require ('../controllers/cart.js');
const verify_client_token = require('../controllers/verify_client_token.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = Router();

router.put('/:id', verify_client_token, async(req,res)=>{
  console.log(req.token);
  jwt.verify(req.token, process.env.SECRET_KEY, async(error, authData) => {
    if(error){
      console.log(error);
      res.status(403).send({message:"Forbidden Access"});
    } else {
      try {
            let{cart_items}=req.body;
            console.log(cart_items,"holaa");
            let {id}=req.params;
            console.log(id,"holaaId");

            let response=await updateCart(cart_items, id);
            return response?res.status(200).json(response):res.status(404);


        } catch(e) {
          console.log(e);
          return res.status(500).json('Error en el servidor')
        }
    }
  })

}

);

router.get('/:id', verify_client_token, async(req,res)=>{
  jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
    if(error){
      res.status(403).send({message:"Forbidden Access"});
    } else {
      try{
        console.log(req.params);
        let clientPhone=req.params.id;
        let response = await getCart(clientPhone);
        return response?res.status(200).json(response):res.status(404);

        }catch(e){
          console.log(e);
          return res.status(500).json('Error en el servidor')
        }
    }
  })

});

router.delete('/:id', verify_client_token, async(req,res)=>{
  jwt.verify(req.token, process.env.SECRET_KEY, async (error, authData) => {
    if(error){
      res.status(403).send({message:"Forbidden Access"});
    } else {
      try{
          let clientPhone=req.params.id;
          let response=await deleteCart(clientPhone);
          return response?res.status(200).json(response):res.status(404);

      }catch(e){
          console.log(e);
          return res.status(500).json('Error en el servidor')
      }
    }
  })

});



module.exports = router;
