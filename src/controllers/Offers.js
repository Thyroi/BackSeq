const { Sequelize, Op } = require('sequelize');
const { Products, Category, Collection } = require('../db.js');

module.exports = {
    Hora : async() =>{
        let date = new Date()
        return date.getDay()
    },
    genOffer: async(id) => {
        let date = new Date()
        let hola = parseInt(date.getDay())

        const women = await Category.findAll({
            where: {
                CategoryIdCategory: hola
            },
            include: [{
                model: Products,
                where: {
                    sdelete: false,
                },
                through: {
                    attributes: []
                }
            }]
        });
        const offer = women.map(e => {
            return "hola"
        })

        return offer
    }
};