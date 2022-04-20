const { Sequelize, Op } = require('sequelize');
const { PurchaseOrder, Client, Invoice, Shippings } = require('../db');

const { getClientbyID } = require('./Client');
const sendMail = require('./Mailer.js');

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
        let email=resp.dataValues.email;
        console.log(email);
        let orderId=purchaseOrder.dataValues.orderId;

        if(orderStatus === 'Completed') {
          let date = Date.now();
          let newInvoice = await Invoice.create({
            invoice_date: date,
            invoice_detail: info,
            invoice_ammount:total
          });
          newInvoice.setPurchaseOrder(orderId);

          let shipping = await Shippings.create();
          shipping.setPurchaseOrder(orderId);
          const mail= {
            type: 'confirmOrder',
            email: email,
             };
            sendMail(mail);
         const mail2= {
            type: 'shipped',
            email: email,
             };
            sendMail(mail2);  

        }
        if(orderStatus === 'Processing') { 
            const mail= {
              type: "inProcess",
              email: email,
               };
              sendMail(mail);
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
        const mail= {
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
