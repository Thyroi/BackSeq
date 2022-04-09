const { Sequelize, Op } = require('sequelize');
const { PurchaseOrder, Client } = require('../db');

    const newOrder=async (info, address, clientPhone )=>{
        console.log(info);

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

     
    const updateOrder=async (info, id)=>{
        console.log(info);
        console.log(id);

        try{
            const updatedclient = await PurchaseOrder.update(info,
                {
                where: {orderId:id }
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
                }         
               });
           }catch(e){
         console.log(e);
     };
    }
     const getOrdersByStatus=async (status)=>{
    
        try{
            const response = await PurchaseOrder.findAll({
               where:{orderStatus:status} ,          
            })    
        return  response;
     }catch(e){
         console.log(e);
     }};
     const getOrdersByClientId=async (client)=>{
        try{
            const response = await PurchaseOrder.findAll({
               where:{ClientPhone:client} ,          
            })    
        return  response;
     }catch(e){
         console.log(e);
     }};

     
     const getOrderDetails=async (id)=>{
        try{
            const response = await PurchaseOrder.findByPk(id);
             
       return response
     }catch(e){
         console.log(e);
     }};




     module.exports ={
        newOrder,
        updateOrder,
        getAllOrders,
        getOrdersByStatus,
        getOrderDetails,
        getOrdersByClientId
    }


     
