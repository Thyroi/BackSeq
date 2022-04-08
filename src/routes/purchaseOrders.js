const { Router } = require('express');

const { newOrder } = require('../controllers/purchaseOrders');

const router = Router();

router.post('/', async(req,res)=>{
    try{
        let{orderDetails, address, clientPhone}=req.body;
        console.log(orderDetails, address, clientPhone);
        let response=await newOrder(orderDetails, address,clientPhone);
       return response?res.status(200).json(response):res.status(404);


    }catch(e){
        console.log(e);
        return res.status(500).json('Error en el servidor')
    }

});

module.exports = router;

