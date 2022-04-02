const axios = require('axios');
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
        return details===null
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
            ? { msg:'Product not found'}
            : response;
    } catch (error) {
        console.log(error);
    }
}
// with more filters, have to fix default order and ommit touristactivities.id
// const getCountryBy = async (name, region, activities, order, start, amount,) => {
//     try {
//         amount = !start ? amount : start > 0 ? 10 : 9;
//         activities = activities.length>0 ? activities : `%` ;
//         const response = await Country.findAll({
//             offset: !start ? null : start,
//             limit: amount ? amount : null,
//             where: {
//                 name: {
//                     [Op.iLike]: name ? `%${name}%` : `%`
//                 },
//                 region: {
//                     [Op.like]: region ? region : `%`
//                 },
//                 '$touristactivities.id$': {
//                     [Op.in]: `%`
//                 },
//             },
//             include: {
//                 model: Touristactivity
//             },
//             order: order
//         })

//         return !response.length
//             ? "Country not found"
//             : response;
//     } catch (error) {
//         console.log(error);
//     }
// }

///////////////////////////////////////////////
const products = {
    getProducts: async (req, res) => {
        try {
            const { name, id } = req.body;
            let response = await getAllProducts();
            if (name) {
                // filters = fixValues(); using dictionary
                response = await getProductByName(name);
            }
            return response.msg
            ? res.status(404).json(response)
            : res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Se rompio todo.');
        }
    },
    getProductsById: async (req, res) => {
        try {
            const { id } = req.params;
            const response = await getProductDetails(id);
            return response.msg
                ? res.status(404).json(response)
                : res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Se rompio todo.');
        }
    }
}

module.exports = products;