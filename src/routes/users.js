const route = require("express").Router();
const { addUser } = require('../controllers/Users');

route.post("/",addUser);
// route.get("/",getClients);

module.exports = route;
