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

     module.exports ={
        newOrder,
    }


     
