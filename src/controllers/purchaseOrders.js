const { Sequelize, Op } = require('sequelize');
const { PurchaseOrder, Client } = require('../db');
const { getClientbyID } = require('./Client');
const sendMail = require('./Mailer.js');

    const newOrder=async (info, address, clientPhone )=>{
        console.log(typeof clientPhone, "soy el tipo de datoq ue viene del front");
        try{
         let purchaseOrder=await PurchaseOrder.create({
                 orderDetails:info,
                 address   
         });
         let  resp= await Client.findByPk(clientPhone);
         console.log(resp, "cliente encontrado con la pk");
        purchaseOrder.setClient(resp);
        /* let client= await Client.findOne({
            where: { phone: clientPhone },
          }); */
          console.log(resp, "hola");
        let email=resp.dataValues.email;
        console.log(resp, "soy al email del cliente encontrado con findONE")
        //let orderId=purchaseOrder.dataValues.orderId;
    
       //sendMail(email,orderId);

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
                    attributes:['name','lastname'],
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
               include:{
                model:Client,
                attributes:['name', 'lastname'],
            }                           
            })    
        return  response;
     }catch(e){
         console.log(e);
     }};
     const getOrdersByClientId=async (client)=>{
        try{
            const response = await PurchaseOrder.findAll({
               where:{ClientPhone:client} , 
               include:{
                model:Client,
                attributes:['name', 'lastname'],
            }                  
            })    
        return  response;
     }catch(e){
         console.log(e);
     }};

     
     const getOrderDetails=async (id)=>{
        try{
            const response = await PurchaseOrder.findByPk(id,  
                {include:{
                model:Client,
                attributes:['phone', 'name', 'lastname'],
                 } });
             
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


     
