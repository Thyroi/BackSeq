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
            const totalOrdersInProcess = await PurchaseOrder.count({
                where: {
                    orderStatus: 'Processing'
                }
            });
            const totalOrdersSubmited = await PurchaseOrder.count({
                where: {
                    orderStatus: 'Submited'
                }
            });
            const totalOrdersCount = totalOrders.reduce((acc, cur) => acc + cur.orderDetails.length, 0);
            const totalOrdersSum = totalOrders.reduce((acc, cur) => acc + cur.total, 0);

            const totalClients = await Client.count();
            const totalClientsRegistered = await Client.count({
                where: {
                    isRegistered: true
                }
            });
            const totalClientsVerified = await Client.count({
                where: {
                    isRegistered: true,
                    isVerified: true
                }
            });
            const totalClientsAnonymous = await Client.count({
                where: {
                    isRegistered: false,
                    isVerified: false
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