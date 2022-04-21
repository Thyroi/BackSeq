const { Sequelize, Op } = require('sequelize');
const { Products, Category, Collection, Client } = require('../db.js');
const mailer  = require('./Mailer');

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
    },
    newOffer: async(info) => {
        var updates =[]
        const products = await Products.findAll({
            where: { id_product: info.ids }
        });
        let productUpdate = products.map(e => {
            return {
                id_product: e.id_product,
                price_offer: e.price,
                price: e.price * ((100-info.discount)/100),
            }
        });
        productUpdate.forEach(async (e) => {
            await Products.update(
                {is_offer: true, price_offer: e.price_offer, price: e.price},
                {
                    where:{ id_product: e.id_product }
                }
            )
        });
        const clients = await Client.findAll({
            where:{newsletter: false}
        });
        let emails = clients.map(e => e.email) 
        let asd = {type: "offers", email: emails, discount: info.discount}
        let mail = await mailer(asd);
        return mail;
    },
    imprimir: async() => {
        await console.log("cron")
    }
    
};