const route = require("express").Router();
const { addCollection } = require('../controllers/Collection');

 route.post("/",addCollection);

module.exports = route;
