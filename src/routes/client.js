const route = require("express").Router();
const { addClient, getClientbyID, getAllClients, updateClient, deleteUser } = require('../controllers/Client');

route.post("/",addClient);
route.get("/:id",getClientbyID);
route.get("/",getAllClients);
route.patch("/:id",updateClient);
route.delete("/:id",deleteUser);

module.exports = route;
