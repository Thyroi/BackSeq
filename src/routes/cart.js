
const { Router } = require('express');
const {Cart, Client}=require ('../db');
const {createCart, updateCart, getCart, deleteCart}=require ('../controllers/Cart.js');
const verify_client_token = require('../controllers/verify_client_token.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = Router();

router.put('/:id', verify_client_token, async(req,res)=>{
  jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
    if(error){
      res.status(403).send({message:"Forbidden Access"});
    } else {
      res.json({message:"Acceso autorizado",
                authData})
    }
  })
    try{
        let{cart_items}=req.body;
        console.log(cart_items,"holaa");
        let {id}=req.params;
        console.log(id,"holaaId");

        let response=await updateCart(cart_items, id);
       return response?res.status(200).json(response):res.status(404);


    }catch(e){
        console.log(e);
        return res.status(500).json('Error en el servidor')
    }
}

);

router.get('/:id', verify_client_token, async(req,res)=>{
  jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
    if(error){
      res.status(403).send({message:"Forbidden Access"});
    } else {
      res.json({message:"Acceso autorizado",
                authData})
    }
  })
    console.log(req.params);
    try{
        let clientPhone=req.params.id;
        /* console.log(clientId, "hola"); */
        let response=await getCart(clientPhone);
       return response?res.status(200).json(response):res.status(404);

    }catch(e){
        console.log(e);
        return res.status(500).json('Error en el servidor')
    }
});

router.delete('/:id', verify_client_token, async(req,res)=>{
  jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
    if(error){
      res.status(403).send({message:"Forbidden Access"});
    } else {
      res.json({message:"Acceso autorizado",
                authData})
    }
  })
    console.log(req.params);
    try{
        let clientPhone=req.params.id;
        /* console.log(clientId, "hola"); */
        let response=await deleteCart(clientPhone);
       return response?res.status(200).json(response):res.status(404);

    }catch(e){
        console.log(e);
        return res.status(500).json('Error en el servidor')
    }
});



module.exports = router;
