const { Sequelize, Op } = require('sequelize');
const productos = require('../data/productsCleanWithOutUndefinedSecondTry.json');
const { Products, Category } = require('../db');

const cleanDetail = (description) => {
  return description.replaceAll(/(.([^]+)})/ig, "").replaceAll(/(<([^>]+)>)/ig, "");
}

async function mapear(e) {
  let response = e.map((e, i) => {
    console.log(i);
    return {
      id_product: e.ProductId ? parseInt(e.ProductId) : 'sin información',
      name: e.name ? e.name : 'sin información',
      authorized_refund: e.IsReturnable ? e.IsReturnable : false,
      price: e.ListPrice ? e.ListPrice : 0,
      description: e.details.description ? cleanDetail(e.details.description) : 'sin descripción',
      brand: e.details.Brand ? e.details.Brand : 'sin información',
      is_offer: e.isOffer ? e.isOffer : false,
      variants: e.variants ? e.variants : { msg: 'sin información' },
      delete: false,
      default_image: e.DefaultProductImage ? e.DefaultProductImage : 'sin información',
      collection: e.collectionId ? parseInt(e.collectionId) : 1,
      id_category: e.categoryId ? parseInt(e.categoryId) : 1
    }
  })
  return response
}

const dbFunctions = {
  categorizar: async (req, res) => {
    var response = [];
    for (let i = 3; i < 32; i++) {
      console.log(i)
      let productosTopus = productos?.filter(e => e.id_category === i).map(e => e.id_product);

      let productosById = await Products.findAll({
        where: {
          id_product: {
            [Op.in]: productosTopus
          }
        }
      });

      let categoria = await Category.findOne({
        where: {
          id_category: i
        }
      })

      response.push(await categoria.addProducts(productosById));
    }
    try {
      res.status(200).json(response);
    } catch (error) {
      console.log('ERROR_____________________\n' + error.message + error.filename + error.lineNumber + error.stack);
      res.redirect(404, '../');
    }
  }
}

module.exports = dbFunctions;