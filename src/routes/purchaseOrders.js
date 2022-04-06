const { Router } = require('express');

const { newOrder } = require('../controllers/purchaseOrders');

const router = Router();

router.post('/', async(req,res)=>{
    try{
        let{orderDetails,clientId}=req.body;
        console.log(orderDetails, clientId);
        let response=await newOrder(orderDetails, clientId);
       return response?res.status(200).json(response):res.status(404);


    }catch(e){
        console.log(e);
        return res.status(500).json('Error en el servidor')
    }

});

module.exports = router;

