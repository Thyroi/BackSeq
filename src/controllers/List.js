const mailer = require('./Mailer.js')
const { Sequelize, Op } = require('sequelize');
const { Client, Products, List } = require('../db.js');

const getList = async (filters) => {
    let { product, user } = filters
    user = user ? parseInt(user) : null;
    // product = product ? parseInt(product) : null;
    // Colaborators: { [Op.contains]: user ? product : { [Op.ne]: null } }
    try {
        const tLists = await List.findAll(
            {
                where: {
                    [Op.or]: [
                        {
                            ClientPhone: user ? user : { [Op.ne]: null },
                        },
                        {
                            Colaborators: { [Op.contains]: `${user}` }
                        }
                    ]
                }
                // get only 1 photo, dscription, price
            });
        return tLists;
    } catch (error) {
        console.log(error);
        return error.data
    }
}

const createList = async (list) => {
    const { user, products, colaborators, title } = list
    const nList = {
        ClientPhone: parseInt(user),
        List: products,
        Colaborators: colaborators,
        title: title
    }
    try {
        if (!user) return { msg: 'Provide clientId.' };
        const tClient = await Client.findByPk(parseInt(user));
        console.log(tClient);
        const tList = await tClient?.createList(nList);
        return !tClient
            ? { msg: 'Client not found.' }
            : tList;
    } catch (error) {
        console.log('rompiste todo ' + error);
        return error.data
    }
}

const updateList = async (list) => {
    let { id, products, colaborators, title } = list
    id = id ? parseInt(id) : null;
    try {
        const nList = await List.update({
            List: products,
            Colaborators: colaborators,
            title: title
        }, {
            where: {
                id: id
            }
        });
        return nList;
    } catch (error) {
        console.log(error);
        return error.data
    }
}

const deleteList = async (id) => {
    try {
        const tDeleted = await List.destroy({
            where: {
                id: id
            }
        });
        return tDeleted;
    } catch (error) {
        return error.data
    }
}
const sendOffers = async () => {
    try {
        let tList = await getList({user: 2152746503});
        tList = tList[0].List.map(l=>parseInt(l));
        let products = await Products.findAll({
            where: {
                id_product: {
                    [Op.in]: tList
                }
            }
        });
        products = products.filter(product => product.is_offfer && product)
        !products.length && mailer()
        return 'holis'
    } catch(error) {
        console.log(error);
    }
}


module.exports = {
    createList,
    updateList,
    getList,
    deleteList,
    sendOffers
};