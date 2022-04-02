const route = require("express").Router();
const { getAllProducts, getProductDetails, getProductByName } = require('../controllers/Products');
const { getByCategory } = require('../controllers/category.js');

route.get("/bycat", async (req, res) => {
    const { id } = req.query;
    try {
        let productsByCategory = await getByCategory(id)
        if (productsByCategory === null) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json(productsByCategory);
    } catch (e) {
        return res.status(500).json({ message: e.data })
    }
});

route.get("/:id",
    async (req, res) => {
        try {
            const { id } = req.params;
            const response = await getProductDetails(id);
            return response.msg
                ? res.status(404).json(response)
                : res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Se rompio todo.');
        }
    }
);

route.get("/",
    async (req, res) => {
        try {
            const { name } = req.body;
            let response = await getAllProducts();
            if (name) {
                // filters = fixValues(); using dictionary
                response = await getProductByName(name);
            }
            return response.msg
                ? res.status(404).json(response)
                : res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Se rompio todo.');
        }
    }
)

module.exports = route;