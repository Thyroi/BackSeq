const { Sequelize, Op, where } = require('sequelize');
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
    console.log("AQUI___________________________\n" + productCategories + updatedProduct)
    try {
        actualizacion = await Products.update(
            updatedProduct, {
            where: {
                id_product: updatedProduct.id_product
            }
        })
        let actualizado = await Products.findByPk(updatedProduct.id_product)
        productCategories.map(async category => {
            const categoryFind = await Category.findOne({
                where: { name: category }
            });
            actualizado.addCategory(categoryFind);
        })
        return actualizado[0] === 0
            ? { msg: 'No se encontro para actualizar.' }
            : actualizado[0];
    } catch (error) {
        console.log(error);
    }
}
const getProductDetails = async (id) => {
    try {
        const details = await Products.findByPk(id
            ,
            {
                where: {
                    sdelete: false,
                },
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
        let hasData = await Products.findAll({
            where: {
                sdelete: false
            }
        }
        );
        return !hasData.length
            ? { msg: 'Esta vacia la tabla.' }
            : hasData;
    } catch (error) {
        console.log(error);
    }
}
const getProductBySuperSearch = async (filters) => {
    try {
        const response = await Products.findAll({
            include: [{
                model: Category,
                required: false,
                through: {
                    attributes: []
                }
            }],
            where: {
                sdelete: false,
                [Op.or]: [{
                    name: {
                        [Op.iLike]: {
                            [Op.any]: filters.map(n => `%${n}%`)
                        }
                    }
                }, {
                    brand: {
                        [Op.iLike]: {
                            [Op.any]: filters.map(b => `%${b}%`)
                        }
                    }
                },
                {
                    '$Categories.name$': {
                        [Op.iLike]: {
                            [Op.any]: filters.map(c => `%${c}%`)
                        }
                    }
                }
                ]
            }
        });
        return !response.length
            ? { msg: 'Product not found.' }
            : response;
    } catch (error) {
        console.log(error);
    }
}
const getByCategory = async () => {
    const women = await Category.findAll({
        where: {
            CategoryIdCategory: 1
        },
        include: [{
            model: Products,
            where: {
                sdelete: false
            },
            through: {
                attributes: []
            }
        }]
    });
    const men = await Category.findAll({
        where: {
            CategoryIdCategory: 2
        },
        include: [{
            model: Products,
            where: {
                sdelete: false
            },
            through: {
                attributes: []
            }
        }]
    });
    return {women, men};
}
const getByCollection = async (id) => {
        const women = await Category.findAll({
            where: {
                CategoryIdCategory: 1
            },
            include: [{
                model: Products,
                where: {
                    sdelete: false,
                    collection : id
                },
                through: {
                    attributes: []
                }
            }]
        });
        const men = await Category.findAll({
            where: {
                CategoryIdCategory: 1
            },
            include: [{
                model: Products,
                where: {
                    sdelete: false,
                    collection : id
                },
                through: {
                    attributes: []
                }
            }]
        });
    return { women, men }
}
const getByOffer = async (param) => {

    try {
        const women = await Products.findAll({
            where: {
                sdelete: false,
                is_offer: param
            },
            include: [{
                model: Category,
                where: {
                    CategoryIdCategory: 1
                },
                through: {
                    attributes: []
                }
            }]
        }
        );
        const men = await Products.findAll({
            where: {
                sdelete: false,
                is_offer: param
            },
            include: [{
                model: Category,
                where: {
                    CategoryIdCategory: 2
                },
                through: {
                    attributes: []
                }
            }]
        }
        );

        return { women, men };
    } catch (error) {
        console.log(error);
    }
}
const createProduct = async (prop) => {
    const { product, categories, collection } = prop
    const { id_product, name, authorized_refund, price, description, brand, is_offer, variants, sdelete, default_image } = product
    try {
        const newProduct = await Products.create({
            id_product,
            name,
            authorized_refund, price,
            description,
            brand,
            is_offer,
            variants,
            sdelete,
            default_image,
            collection
        });
        categories.map(async e => {
            const eDB = await Category.findAll({
                where: { name: e }
            })
            newProduct.addCategory(eDB);
        });
        // const collectione = await Collection.findByPk(collections);
        // collectione.addProducts(newProduct);
        return { "status": 201, "message": "Product has been created correctly.", "data": newProduct };
    } catch (error) {
        return error.data
    }
}
const getWomen = async (id) => {
    const women = await Products.findAll({
        where: {
            sdelete: false,
        },
        include: [{
            model: Category,
            where: {
                CategoryIdCategory: id
            },
            through: {
                attributes: []
            }
        }]
    }
    );
    return women;
}
const getMen = async (id) => {
    const men = await Products.findAll({
        where: {
            sdelete: false,
        },
        include: [{
            model: Category,
            where: {
                CategoryIdCategory: id
            },
            through: {
                attributes: []
            }
        }]
    }
    );
    return men;
}
module.exports = {
    getAllProducts,
    getProductDetails,
    getByCategory,
    getByCollection,
    getByOffer,
    createProduct,
    updateProducts,
    deleteProduct,
    getByCategory,
    getByCollection,
    getWomen,
    getMen,
    getProductBySuperSearch
};