const { Sequelize, Op } = require('sequelize');
const { Client, Products, List } = require('../db.js');

const getList = async (filters) => {
    let { product, user } = filters
    user = user ? parseInt(user) : null;
    console.log(user)
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
            });
        console.log(tLists)
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



module.exports = {
    createList,
    updateList,
    getList,
    deleteList
};