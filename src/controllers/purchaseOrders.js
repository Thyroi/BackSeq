const { Sequelize, Op } = require('sequelize');
const { PurchaseOrder, Client, Invoice, Shippings, Discounts } = require('../db');
const crypto = require('crypto');
const { getClientbyID } = require('./Client');
const sendMail = require('./Mailer.js');
const { stringify } = require('querystring');

const newOrder = async (info, address, clientPhone, total, orderStatus) => {

    try {
        let purchaseOrder = await PurchaseOrder.create({
            orderDetails: info,
            total,
            address,
            orderStatus
        });
        let resp = await Client.findByPk(clientPhone);
        purchaseOrder.setClient(resp);
        let email = resp.dataValues.email;
        console.log(email);
        let orderId = purchaseOrder.dataValues.orderId;

        if (orderStatus === 'Completed') {
            let date = Date.now();
            let newInvoice = await Invoice.create({
                invoice_date: date,
                invoice_detail: info,
                invoice_ammount: total
            });
            newInvoice.setPurchaseOrder(orderId);

            let shipping = await Shippings.create();
            shipping.setPurchaseOrder(orderId);
            const mail = {
                type: 'confirmOrder',
                email: email,
            };
            sendMail(mail);
            const mail2 = {
                type: 'shipped',
                email: email,
            };
            sendMail(mail2);

        }
        if (orderStatus === 'Processing') {
            const mail = {
                type: "inProcess",
                email: email,
            };
            sendMail(mail);
        }

        if (total > 60) {
            let data = JSON.stringify(orderId + total + clientPhone);
            let discount = crypto.createHash('md5').update(data).digest('hex').slice(0, 8);
            const mail = {
                type: "confirmation",
                email: resp.email,
                code: discount,
                discount: 10
            };
            await sendMail(mail);
            let disCode = await Discounts.create({
                code: discount,
                discount: 10,
                state: true
            });
        }


        return purchaseOrder;

    } catch (e) {
        console.log(e);
    }
};
const updateOrder = async (info, id) => {
    try {
        const updatedclient = await PurchaseOrder.update(info,
            {
                where: { orderId: id }
            });
        const order = await PurchaseOrder.findByPk(id);
        const client = await Client.findByPk(order.dataValues.ClientPhone);
        const mail = {
            type: 'confirmOrder',
            email: client.dataValues.email,
        };
        sendMail(mail);
        return updatedclient;

    } catch (e) {
        console.log(e);
    }
};
const getAllOrders = async () => {

    try {
        return await PurchaseOrder.findAll({
            include: {
                model: Client,
                attributes: ['name', 'lastname'],
            }
        });
    } catch (e) {
        console.log(e);
    };
}
const getOrdersByStatus = async (status) => {

    try {
        const response = await PurchaseOrder.findAll({
            where: { orderStatus: status },
            include: {
                model: Client,
                attributes: ['name', 'lastname'],
            }
        })
        return response;
    } catch (e) {
        console.log(e);
    }
};
const getOrdersByClientId = async (client) => {
    try {
        const response = await PurchaseOrder.findAll({
            where: { ClientPhone: client },
            include: {
                model: Client,
                attributes: ['name', 'lastname'],
            }
        })
        return response;
    } catch (e) {
        console.log(e);
    }
};
const getOrderDetails = async (id) => {
    try {
        const response = await PurchaseOrder.findByPk(id,
            {
                include: {
                    model: Client,
                    attributes: ['phone', 'name', 'lastname'],
                }
            });

        return response
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    newOrder,
    updateOrder,
    getAllOrders,
    getOrdersByStatus,
    getOrderDetails,
    getOrdersByClientId
}
