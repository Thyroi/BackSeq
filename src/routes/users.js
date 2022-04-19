const route = require("express").Router();
const { addUser, getUserbyID, getAllUser, updateUserRol, deleteUser } = require('../controllers/Users');
const verify_admin_token = require('../controllers/verify_admin_token.js');

route.post("/", verify_admin_token, addUser);
route.get("/",getAllUser);
route.get("/:id_user",getUserbyID);
route.put("/", verify_admin_token, updateUserRol);
route.delete("/", verify_admin_token, deleteUser);

module.exports = route;
