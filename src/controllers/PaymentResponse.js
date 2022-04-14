
const { Sequelize, Op } = require('sequelize');
const { PaymentResponse } = require('../db');

    const newPayment=async (info)=>{
        console.log(info, "_____________soy la info del payment");

        try{
     /*     let clientCart=await Cart.findOne({
              where:{
                 ClientPhone:info
             } 
           
         });
        return clientCart; */
     }catch(e){
         console.log(e);
     }};
     module.exports ={
       newPayment,

    }


