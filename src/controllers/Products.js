const { Sequelize, Op } = require('sequelize');
const { Products, Category, Collection } = require('../db.js');

const updateProducts = async (updatedProduct) => {
    console.log(`AQUI____________________________\n ${updatedProduct}`)
    try {
        actualizado = await Products.update(
            updatedProduct, {
            where: {
                id_product: updatedProduct.id_product
            }
        }
        )
        return actualizado[0] === 0
            ? { msg: 'No se encontro para actualizar.' }
            : await Products.findByPk(updatedProduct.id_product);
    } catch (error) {
        console.log(error);
    }
}
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

module.exports = {
    getProductDetails,
    getAllProducts,
    getProductByName,
    updateProducts
};