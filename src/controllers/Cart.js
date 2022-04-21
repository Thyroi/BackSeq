
const { Sequelize, Op } = require('sequelize');
const { Cart, Discounts} = require('../db');

const getCart = async (info) => {
    console.log(info);

    try {
        let clientCart = await Cart.findOne({
            where: {
                ClientPhone: info
            }
        });
        return clientCart;
    } catch (e) {
        console.log(e);
    }
};

const updateCart = async (info, id) => {
    console.log(info, id);
    try {
        console.log(info);
        const updatedCart = await Cart.update({
            cart_items: info
        },
            { where: { ClientPhone: id } });

        return updatedCart;
    } catch (e) {
        console.log(e);
    }

};

const deleteCart = async (id) => {
    console.log(id);
    try {
        console.log(info);
        const deletedCart = await Cart.destroy(
            { where: { ClientPhone: id } });

    } catch (e) {
        console.log(e);
    }

};

const verifyDiscount = async (code, total) => {
    try {
        const response = await Discounts.findOne({
            where: {
                code: code,
                state: true
            }
        });

        if (response) {
            // response.state = false;
            // await response.save();
            let discount = response.discount;
            let newTotal = total - (total * (discount / 100));
            return newTotal;
        } else {
            return total;
        }
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    updateCart,
    getCart,
    verifyDiscount,
    deleteCart
}
