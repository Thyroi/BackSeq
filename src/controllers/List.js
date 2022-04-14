const mailer = require('./Mailer.js')
const { Sequelize, Op } = require('sequelize');
const { Client, Products, List } = require('../db.js');

const getList = async (filters) => {
    let { rList, ClientPhone } = filters
    ClientPhone = ClientPhone ? parseInt(ClientPhone) : null;
    try {
        let tLists = await List.findAll(
            {
                where: {
                    [Op.or]: [
                        {
                            id: ClientPhone ? ClientPhone : { [Op.ne]: null },
                        },
                        {
                            Colaborators: { [Op.contains]: `${ClientPhone}` }
                        }]
                }
            });
        // Para evitar mas llamados al back
        console.log("---->>> "+tLists.length);
        let response = tLists.map(async (list) => {
            //Para la preview de los products
            list.List = await Products.findAll({
                attributes: ['id_product', 'sdelete', 'name', 'price', 'description', 'is_offer', 'default_image'],
                where: {
                    id_product: { [Op.in]: list.List }
                }
            });
            // Para el preview de los colaboradores y access manage
            // tofix when isverified este implementado, change isRegistered > isVerified
            if (list.Colaborators.length) {
                const idColaborators = list.Colaborators.map(e => e.phone);
                await Client.findAll({
                    attributes: ['phone', 'login_name', 'email', 'name', 'lastname', 'isVerified'],
                    where: {
                        isRegistered: true,
                        phone: { [Op.in]: idColaborators }
                    }
                }).then(data => {
                    list.Colaborators = list.Colaborators.map(e => {
                        return {
                            ...e,
                            ...{ ...data.find(c => parseInt(c.phone) === parseInt(e.phone)) }.dataValues
                        }
                    })
                });
            }
            return list
        });
        return await Promise.all(response);
    } catch (error) {
        console.log(error);
        return error.data
    }
}

const createList = async (list) => {
    const { ClientPhone, rList, Colaborators, title } = list
    const nList = {
        ClientPhone: parseInt(ClientPhone),
        List: rList,
        Colaborators: Colaborators,
        title: title
    }
    try {
        if (!ClientPhone) return { msg: 'Provide clientId.' };
        const tClient = await Client.findByPk(parseInt(ClientPhone));
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
    let { id, rList, Colaborators, title } = list
    id = id ? parseInt(id) : null;
    try {
        const nList = await List.update({
            List: rList,
            Colaborators: Colaborators,
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
        let tList = await getList({ user: 2152746503 });
        tList = tList[0].List.map(l => parseInt(l));
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
    } catch (error) {
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