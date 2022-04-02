const route = require("express").Router();
const {populateDB} = require('../controllers/Populate.js');

route.post("/",populateDB);

module.exports = route;