const { getCategories, getCollections } = require("../controllers/selectors");

const route = require("express").Router();

route.get("/categories", async (req, res) =>{
    try{
        let categories = await getCategories();
        return res.status(200).json({women : categories[0], men : categories [1]})
    }catch(error){
        return res.json({ "message": error.data })
    }
});
route.get("/collections", async (req, res) =>{
    try{
        let collections = await getCollections();
        return res.status(200).json(collections)
    }catch(error){
        return res.json({ "message": error.data })
    }
});
module.exports = route;