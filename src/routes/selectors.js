const { getCategories } = require("../controllers/selectors");

const route = require("express").Router();

route.get("/categories", async (req, res) =>{
    try{
        let categories = await getCategories();
        return res.status(200).json(categories)
    }catch(error){
        return res.json({ "message": error.data })
    }
});
route.get("/collections", async (req, res) =>{

    try{
        let collections = await getCategories();
        return res.status(200).json(collections)
    }catch(error){
        return res.json({ "message": error.data })
    }
});
module.exports = route;