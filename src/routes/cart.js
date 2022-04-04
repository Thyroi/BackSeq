
const { Router } = require('express');
const {Cart}=require ('../db');
const {createCart, updateCart, getCart}=require ('../controllers/cart.js');

const router = Router();



 router.post('/',async (req, res)=>{
    const  createCart= async (info)=>{
        try{
               let{cart_items, ClientPhone}=info;
            let newCart=await Cart.create({
                cart_items,
            });

            let  resp= await Client.findByPk(ClientPhone);
            newCart.setClient(resp);
            return  newCart;
        }catch(e){
            console.log(e);
        }};
    try{

     let cartInfo=req.body;
     let response=await createCart(cartInfo);
     console.log(response);
    return response?res.status(200).json(response):res.status(400);

 }catch(e){
     console.log(e);
     return res.status(500).json('Error en el servidor')
 }},);

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
        let clientId=req.params.id;
        console.log(clientId, "hola");
        let response=await getCart(clientId);
       return response?res.status(200).json(response):res.status(404);

    }catch(e){
        console.log(e);
        return res.status(500).json('Error en el servidor')
    }
});
       

module.exports = router;
