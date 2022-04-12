const { Sequelize, Op } = require('sequelize');
const { Products, Category, Collection } = require('../db.js');

module.exports = {
    getItems: async() => {
        let date = new Date()
        let hola = parseInt(date.getDay())

        const products = await Category.findAll({
            where: {
                id_category: 3
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
        let ids = []
        let prices = []
        products.forEach(e => e.Products.forEach(a => {
            let price = a.price *((100-10)/100);
            ids.push(a.id_product);
            prices.push(price)
        }))
        return {ids, prices}
    },
    genOffer: async(info) => {
        const items = [];
        for (let i = 0; i < info.ids.length; i++) {
            let answer = await Products.update(
                { is_offer: true, price_offer: info.prices[i]},
                {
                    where:{
                        id_product: info.ids[i]
                    }
                } 
            );
            items.push(answer)
        }
        
        return items
    }
};