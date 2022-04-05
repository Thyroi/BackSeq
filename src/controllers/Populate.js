const { Sequelize, Op } = require('sequelize');
const productos = require('../data/productsCleanWithOutUndefinedSecondTry.json');
const clientes = require('../data/clientes.json');
const { Products, Category, Client } = require('../db');

const cat = [
    { id_category: 1, name: 'women', CategoryIdCategory: 1 },
    { id_category: 2, name: 'men', CategoryIdCategory: 2 },
    { id_category: 3, name: 'mens_accessories_hats', CategoryIdCategory: 2 },
    { id_category: 4, name: 'acc_hat', CategoryIdCategory: 2 },
    { id_category: 5, name: 'acc_beauty_makeup', CategoryIdCategory: 1 },
    { id_category: 6, name: 'swimwear_all', CategoryIdCategory: 1 },
    { id_category: 7, name: 'outerwear_coats_and_jackets', CategoryIdCategory: 1 },
    { id_category: 8, name: 'sweater', CategoryIdCategory: 1 },
    { id_category: 9, name: 'shoes', CategoryIdCategory: 1 },
    { id_category: 10, name: 'top_blouses', CategoryIdCategory: 1 },
    { id_category: 11, name: 'acc_jewelry', CategoryIdCategory: 1 },
    { id_category: 12, name: 'activewear', CategoryIdCategory: 1 },
    { id_category: 13, name: 'lingerie', CategoryIdCategory: 1 },
    { id_category: 14, name: 'acc_handbags', CategoryIdCategory: 1 },
    { id_category: 15, name: 'sets', CategoryIdCategory: 1 },
    { id_category: 16, name: 'home_and_gift', CategoryIdCategory: 1 },
    { id_category: 17, name: 'dress', CategoryIdCategory: 1 },
    { id_category: 18, name: 'loungewear', CategoryIdCategory: 1 },
    { id_category: 19, name: 'acc_glasses', CategoryIdCategory: 1 },
    { id_category: 20, name: 'bottoms_skirt', CategoryIdCategory: 1 },
    { id_category: 21, name: 'bottoms_shorts', CategoryIdCategory: 1 },
    { id_category: 22, name: 'rompers_jumpsuits', CategoryIdCategory: 1 },
    { id_category: 23, name: 'mens_bottom_swim', CategoryIdCategory: 2 },
    { id_category: 24, name: 'mens_bottom_shorts', CategoryIdCategory: 2 },
    { id_category: 25, name: 'mens_jackets_and_coats', CategoryIdCategory: 2 },
    { id_category: 26, name: 'mens_tops', CategoryIdCategory: 2 },
    { id_category: 27, name: 'mens_bottom_denim', CategoryIdCategory: 2 },
    { id_category: 28, name: 'mens_bottom_pants', CategoryIdCategory: 2 },
    { id_category: 29, name: 'mens_tees_tanks_graphic', CategoryIdCategory: 2 },
    { id_category: 30, name: 'mens_underwear_socks', CategoryIdCategory: 2 },
    { id_category: 31, name: 'mens_sweaters', CategoryIdCategory: 2 }
];

const dbFunctions = {
    populateDB: async (req, res) => {
        let categories = await Category.bulkCreate(
            cat
        )
        let response = await Products.bulkCreate(
            productos,
            {
                ignoreDuplicates: true
            }
        )
        let clients = await Client.bulkCreate(clientes)
        try {
            res.status(200).json(`${response.length} products. ${categories.length} categories and ${clients.length} clients.`);
        } catch (error) {
            console.log('ERROR_____________________\n' + error.message + error.filename + error.lineNumber + error.stack);
            res.redirect(404, '../');
        }
    },
    addProduct: async(req, res) => {

        let encontrados = await Products.findAll({
            where: {
                id_product: 1000453235
            }
        })
        let encontrado = await Products.findOne({
            where: {
                id_product: 1000453235
            }
        })

        let categoria = await Category.findOne({
            where: {
                name:"men"
            }
        })

        let response = await encontrado.addCategory(categoria);
        res.status(200).json(`${response} products. ${response.length}`);
    }
}

module.exports = dbFunctions;
