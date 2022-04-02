const route = require("express").Router();
const {populateDB, addProduct} = require('../controllers/Populate.js');
const {categorizar} = require('../controllers/deprePopulate.js')

route.post("/popu",populateDB);
route.post("/add",addProduct);
route.post("/cat",categorizar);

module.exports = route;