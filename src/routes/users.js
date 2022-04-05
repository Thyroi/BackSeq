const route = require("express").Router();
const { addUser, getUserbyID, getAllUser, updateUserRol, deleteUser } = require('../controllers/Users');

route.post("/",addUser);
route.get("/",getAllUser);
route.get("/:id_user",getUserbyID);
route.patch("/",updateUserRol);
route.delete("/:id_user",deleteUser);

module.exports = route;
