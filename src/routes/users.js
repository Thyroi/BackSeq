const route = require("express").Router();
const { addUser, getUserbyID, getAllUser, updateUserRol, deleteUser } = require('../controllers/Users');

route.post("/",addUser);
route.get("/",getAllUser);
route.get("/:id_user",getUserbyID);
route.put("/",updateUserRol);
route.delete("/",deleteUser);

module.exports = route;
