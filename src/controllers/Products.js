const { Sequelize, Op } = require('sequelize');
const { Products, Category, Collection } = require('../db.js');

const getProductDetails = async (id) => {
    try {
        const details = await Products.findByPk(id
            ,
            {
                include: [{
                    model: Category,
                    through: {
                        attributes: []
                    }
                }]
            }
        );
        return details === null
            ? { msg: 'No se encontro producto con ese Id.' }
            : details;
    } catch (error) {
        console.log(error);
    }
}
const getAllProducts = async () => {
    try {
        let hasData = await Products.findAll();
        return !hasData.length
            ? { msg: 'Esta vacia la tabla.' }
            : hasData;
    } catch (error) {
        console.log(error);
    }
}
const getProductByName = async (name) => {
    try {
        const response = await Products.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })
        return !response.length
            ? { msg: 'Product not found' }
            : response;
    } catch (error) {
        console.log(error);
    }
}
const createProduct = async (product) => {
    
    try {
        const { id_product, name, authorized_refund, price, description, bran, is_offer, variants, delete, default_image } = product
        const newProduct = await Products.create({
            id_product,
            name,
            authorized_refund,
            price,
            description,
            bran,
            is_offer,
            variants,
            delete : delete,
            default_image
        })
    } catch (error) {
        return res.status(500).json({ "mesagge": error.data })
    }
}
///////////////////////////////////////////////


module.exports = {
    getProductDetails,
    getAllProducts,
    getProductByName
};