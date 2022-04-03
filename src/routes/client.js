const route = require("express").Router();
const { addClient, getClientbyID, getAllClients, updateClient, deleteUser } = require('../controllers/Clients');

route.post("/",addClient);
route.get("/:phone",getClientbyID);
route.get("/",getAllClients);
route.patch("/",updateClient);
route.delete("/:phone",deleteUser);

module.exports = route;
