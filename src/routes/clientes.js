const route = require("express").Router();
const { getClientBynick_pass } = require('../controllers/Client');

route.get("/",getClientBynick_pass);

module.exports = route;
