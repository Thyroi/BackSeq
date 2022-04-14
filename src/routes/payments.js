const { Router } = require('express');

const { newPayment} = require('../controllers/PaymentResponse');

const router = Router();

router.post('/', async(req,res)=>{
    try{
        let info=req.body;
        await newPayment(info);
        //let response=await newPayment(orderDetails, address,clientPhone);
       //return response?res.status(200).json(response):res.status(404);

    }catch(e){
        console.log(e);
        return res.status(500).json('Error en el servidor')
    }

});

module.exports = router;
