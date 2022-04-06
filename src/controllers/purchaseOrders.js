const { Sequelize, Op } = require('sequelize');
const { PurchaseOrder, Client } = require('../db');

    const newOrder=async (info, clientId,address, )=>{
        console.log(info);
        console.log(clientId);

        //let addressDb= await Client.findByPk(clientId)
        // aca me traigo la direccion resgitrada

        try{
         let purchaseOrder=await PurchaseOrder.create({
                 orderDetails:info,
                 address   
         });
         let  resp= await Client.findByPk(clientId);
        purchaseOrder.setClient(resp);
        return  purchaseOrder;

     }catch(e){
         console.log(e);
     }};

     module.exports ={
        newOrder,
    }


     
