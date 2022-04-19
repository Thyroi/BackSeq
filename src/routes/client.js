const route = require("express").Router();
const { addClient, getClientbyEmail, getClientbyID, getAllClients, updateClient, deleteUser, verify, resetPassword } = require('../controllers/Client');
const verify_client_token = require('../controllers/verify_client_token.js');

route.get("/byEmail",getClientbyEmail);
route.get("/verify",verify)
route.get("/resetPass",resetPassword)
route.post("/",addClient);
route.get("/:id",getClientbyID);
route.get("/",getAllClients);
route.patch("/:id", verify_client_token, updateClient);
route.delete("/:id",verify_client_token, deleteUser);

module.exports = route;
