const { Sequelize, Op } = require('sequelize');
const { PurchaseOrder, Client, Invoice } = require('../db');
const { getClientbyID } = require('./Client');
const sendMail = require('./Mailer.js');

    const newOrder=async (info, address, clientPhone, total, orderStatus)=>{

        try{
         let purchaseOrder=await PurchaseOrder.create({
                 orderDetails:info,
                 total,
                 address,
                 orderStatus
         });
         let  resp= await Client.findByPk(clientPhone);
        purchaseOrder.setClient(resp);
        console.log(info, address, clientPhone, total, orderStatus, resp)
        let email=resp.dataValues.email;
        let orderId=purchaseOrder.dataValues.orderId;

        if(orderStatus === 'Completed') {
          let date = Date.now();
          let newInvoice = await Invoice.create({
            invoice_date: date,
            invoice_detail: info,
            invoice_ammount:total
          });
          newInvoice.setPurchaseOrder(orderId);
        }

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
