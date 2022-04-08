const { Router } = require('express');

const { newOrder,updateOrder, getAllOrders, getOrdersByStatus} = require('../controllers/purchaseOrders');

const router = Router();

router.post('/', async(req,res)=>{
    try{
        let{orderDetails, address, clientPhone}=req.body;
        //console.log(orderDetails, address, clientPhone);
        let response=await newOrder(orderDetails, address,clientPhone);
       return response?res.status(200).json(response):res.status(404);


    }catch(e){
        console.log(e);
        return res.status(500).json('Error en el servidor')
    }

});

router.patch('/:id', async(req,res)=>{
    try{
        let info =req.body;
        let {id}=req.params;
        //console.log(orderDetails, address, clientPhone);
        let response=await updateOrder(info, id);
       return response?res.status(200).json(response):res.status(404);


    }catch(e){
        console.log(e);
        return res.status(500).json('Error en el servidor')
    }

});


router.get("/",async (req, res) => {
        try {
            let { filter } = req.query;
            let response;
            if (filter) response = await getOrdersByStatus(filter);
            if (!filter) response = await getAllOrders();
            return response?res.status(200).json(response):res.status(404)
                
        } catch (error) {
            console.log(error);
            return res.status(500).json('Error en el servidor.');
        }
    }
); 



module.exports = router;

