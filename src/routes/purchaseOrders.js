const { Router } = require('express');

const { newOrder,updateOrder, getAllOrders, getOrdersByStatus, getOrderDetails, getOrdersByClientId} = require('../controllers/purchaseOrders');

const router = Router();

router.post('/', async(req,res)=>{
    try{
        let{orderDetails, address, clientPhone, total, orderStatus}=req.body;
        console.log(orderStatus);
        if( orderStatus="in-process") orderStatus='Processing';
        let response=await newOrder(orderDetails, address,clientPhone, total, orderStatus);
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
            let { status } = req.query;
            let {client}=req.query;
            let response;
            if (status) response = await getOrdersByStatus(status);
            if (client) response = await getOrdersByClientId(client);
            if (!status&&!client) response = await getAllOrders();
            return response?res.status(200).json(response):res.status(404)
                
        } catch (error) {
            console.log(error);
            return res.status(500).json('Error en el servidor.');
        }
    }
); 
router.get("/:id",async (req, res) => {
    try {
        let {id}=req.params;
         response = await getOrderDetails(id);
 
        return response?res.status(200).json(response):res.status(404)
            
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error en el servidor.');
    }
}
); 

module.exports = router;

