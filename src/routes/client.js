const route = require("express").Router();
const { addClient, getClientbyID, getAllClients, updateClient, deleteUser, verify, resetPassword } = require('../controllers/Client');

route.get("/verify",verify)
route.get("/resetPass",resetPassword)
route.post("/",addClient);
route.get("/:id",getClientbyID);
route.get("/",getAllClients);
route.patch("/:id",updateClient);
route.delete("/:id",deleteUser);

module.exports = route;
