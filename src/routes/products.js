const route = require("express").Router();
// const {getProducts, getDetail, populateProducts, addProduct } = require('../controllers/Products');
const {} =require ('../controllers/category')
const {getByCategory} = require('../controllers/category.js');

route.get("/", async (req, res) =>{
    const {id} = req.query; 
    try{
        let productsByCategory = await getByCategory(id)
        if(productsByCategory === null){
            return res.status(404).json({message: "Category not found"});
        }
        return res.status(200).json(productsByCategory);
    }catch(e){
        return res.status(404).json({ message: e.data })
    }
    
    });
// route.get("/",getProducts);
// route.get("/:id_product", getDetail)
// // route.post("/",addProduct);
// route.post("/populate",populateProducts);

module.exports = route;