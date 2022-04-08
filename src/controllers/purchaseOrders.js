const { Sequelize, Op } = require('sequelize');
const { PurchaseOrder, Client } = require('../db');

    const newOrder=async (info, address, clientPhone )=>{
        console.log(info);
        console.log(clientPhone);


        try{
         let purchaseOrder=await PurchaseOrder.create({
                 orderDetails:info,
                 address   
         });
         let  resp= await Client.findByPk(clientPhone);
         console.log(resp);
        purchaseOrder.setClient(resp);
        return  purchaseOrder;

     }catch(e){
         console.log(e);
     }};

     
    const updateOrder=async (info, clientPhone)=>{
        console.log(info);
        console.log(clientPhone);

        try{
            const updatedclient = await PurchaseOrder.update(info,
                {
                where: {clientPhone }
              });
        
      
        return  updatedclient;

     }catch(e){
         console.log(e);
     }};
        
    const getAllOrders=async ()=>{
    
        try{
            return await PurchaseOrder.findAll({
                include:{
                    model:Client,
                    attributes:['phone'],
                    //through:{attributes:[]}
                } 
             
               });
           }catch(e){
         console.log(e);
     };
    }

     const getOrdersByStatus=async (filter)=>{
        console.log(filter);

        try{
            const response = await PurchaseOrder.findAll({
                include: [{
                    model: Client,
                    through: {
                        attributes: ['phone']
                    }
                }],
                where:{orderStatus:filter}            
            })    
      
        return  response;

     }catch(e){
         console.log(e);
     }};




     module.exports ={
        newOrder,
        updateOrder,
        getAllOrders,
        getOrdersByStatus
    }


     
