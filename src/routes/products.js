const route = require("express").Router();
const {getProducts, getProductsById} = require('../controllers/Products');

route.get("/get",getProducts);
route.get("/:id",getProductsById);


// route.get("/:id_product", getDetail)
// // route.post("/",addProduct);
// route.post("/populate",populateProducts);

module.exports = route;