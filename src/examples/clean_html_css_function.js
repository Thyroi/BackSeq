const { Sequelize, Op } = require('sequelize');
const productos = require('../data/products.json');
const {Products} = require('../db');

const cleanDetail = (description) => {
    return description.replaceAll(/(.([^]+)})/ig, "").replaceAll(/(<([^>]+)>)/ig, "");
  }
  
  async function mapear(e) {
    let response = e.map((e, i) => {
      console.log(i);
      return {
        id_product: parseInt(e.ProductId),
        name: e.name,
        authorized_refund: e.IsReturnable,
        price: e.ListPrice,
        description: cleanDetail(e.details.Description),
        brand: e.details.Brand,
        is_offer: e.isOffer,
        variants: e.variants,
        delete: false,
        default_image: e.DefaultProductImage,
        collection: parseInt(e.collectionId),
        id_category: parseInt(e.categoryId)
      }
    })
    return response
  }

const dbFunctions = {
    populateDB: async (req, res) => {
        let limpio = await mapear(productos);
        try {
            res.status(200).json(limpio);
        } catch (error) {
            console.log('ERROR_____________________\n' + error.message + error.filename + error.lineNumber + error.stack);
            res.redirect(404, '../');
        }
    }
}

module.exports = dbFunctions;