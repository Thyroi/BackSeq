const { Sequelize, Op, where } = require('sequelize');
const { SearchTerms, PurchaseOrder, Client, Category, Collection } = require('../db');

const statistics = {
    getOrders: async () => {
        try {
            const totalOrders = await PurchaseOrder.findAll({
                where: {
                    orderStatus: 'Completed'
                }
            });
            const totalOrdersCount = totalOrders.length;
            const totalOrdersSum = totalOrders.reduce((acc, cur) => acc + cur.total, 0);

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