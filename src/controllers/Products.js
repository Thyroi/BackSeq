const { Sequelize, Op } = require('sequelize');
const { Products, Category, Collection } = require('../db.js');

const deleteProduct = async (id) => {
    try {
        eliminado = await Products.update(
            { sdelete: true }, {
            where: {
                id_product: id
            }
        })
        return eliminado[0] === 0
            ? { msg: 'No se encontro para eliminar.' }
            : eliminado[0];
    } catch (error) {
        console.log(error);
    }
}
const updateProducts = async ({ updatedProduct, productCategories }) => {
    try {
        actualizacion = await Products.update(
            updatedProduct, {
            where: {
                id_product: updatedProduct.id_product
            }
        })
        let actualizado = await Products.findByPk(updatedProduct.id_product)
        productCategories.map(category => {
            const category = await Category.findOne({
                where: { name: category }
            });
            actualizado.addCategory(category);
        })
        return actualizado[0] === 0
            ? { msg: 'No se encontro para actualizar.' }
            : actualizado;
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
    updateProducts,
    deleteProduct
};