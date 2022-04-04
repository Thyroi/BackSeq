const route = require("express").Router();
const { addCollection } = require('../controllers/Collection');

 route.post("/",addCollection);
// route.get("/",getClients);

module.exports = route;
