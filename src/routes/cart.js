
const { Router } = require('express');
const {Cart, Client}=require ('../db');
const {createCart, updateCart, getCart, deleteCart}=require ('../controllers/cart.js');

const router = Router();

router.patch('/:id', async(req,res)=>{
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

router.get('/:id',async(req,res)=>{
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

router.delete('/:id',async(req,res)=>{
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
