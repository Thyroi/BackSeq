const { Sequelize, Op } = require('sequelize');
const { Products, Category, Collection } = require('../db.js');

module.exports = {
    Hora : async() =>{
        let date = new Date()
        return date.getDay()
    },
    genOffer: async(id) => {
        const hola = await Category.findAll({
            where: {
                CategoryIdCategory: id
            },
            include: [{
                model: Products,
                where: {
                    sdelete: false
                },
                through: {
                    attributes: []
                }
            }]
        });
        // const offer = hola?.map(e =>{
        //     // return {
        //     //     id_product: e.id_product,
        //     //     is_offer: e.is_offer,
        //     //     price: e.price
        //     // }
        // })
        return hola
    }
};