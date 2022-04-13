const route = require("express").Router();
const { addClient, getClientbyID, getAllClients, updateClient, deleteUser, verify, resetPassword, getClientbylogname_logpass } = require('../controllers/Client');

route.get("/verify",verify)
route.get("/resetPass",resetPassword)
route.post("/",addClient);
route.get("/:id",getClientbyID);
route.get("/",getAllClients);
route.patch("/:id",updateClient);
route.delete("/:id",deleteUser);
route.get("/",getClientbylogname_logpass);

module.exports = route;
