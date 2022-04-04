
const { Sequelize, Op } = require('sequelize');
const { Cart, Client } = require('../db');

    const getCart=async (info)=>{
        console.log(info);

        try{
         let clientCart=await Cart.findOne({
             where:{
                 ClientPhone:info
             }
         });
        return clientCart;
     }catch(e){
         console.log(e);
     }};

     const updateCart= async (info,id)=>{
         console.log(info, id);
        try{
            console.log(info);
            const updatedCart= await Cart.update({
                cart_items:info }
                , {where:{ClientPhone:id}});

            return  updatedCart;
        }catch(e){
            console.log(e);
    }

}

module.exports ={
    updateCart,
    getCart
}
