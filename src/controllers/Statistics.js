const { Sequelize, Op, where } = require('sequelize');
const { SearchTerms, PurchaseOrder, Client, Category, Collection } = require('../db');

const statistics = {
    getOrders: async () => {
        try {
            const orders = await PurchaseOrder.findAll({
                where: {
                    orderStatus: 'Completed'
                }
            });
            return orders
        }
        catch (error) {
            console.log(error);
        }
    },
    getSearchTerms: async (orderField, order) => {
        try {
            const searchTerms = await SearchTerms.findAll({
                order: [
                    orderField && order ? [orderField, order] : ['count', 'DESC']
                ]
            });
            return searchTerms;
        }
        catch (error) {
            console.log(error);
        }
    },
    addSearchTerm: async (term) => {
        try {
            const searchTerm = await SearchTerms.findOne({
                where: {
                    term
                }
            });
            if (searchTerm) {
                searchTerm.count += 1;
                await searchTerm.save();
            }
            else {
                await SearchTerms.create({
                    term,
                    count: 1
                });
            }
            return searchTerm
        }
        catch (error) {
            console.log(error);
        }
    }
}
module.exports = statistics;