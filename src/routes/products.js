const route = require("express").Router();
const { getAllProducts,
    getSomeProducts,
    getProductDetails,
    createProduct,
    updateProducts,
    getByCategory,
    getByCollection,
    getByOffer,
    getWomen,
    getReviews,
    getProductBySuperSearch,
    getByMoreRecent,
    getOrderPrice,
    getMen } = require('../controllers/Products');
const verify_admin_token = require('../controllers/verify_admin_token.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

route.get("/order", async (req, res) => {
    const { type } = req.query;
    try {
        const ordered = await getOrderPrice(type);
        return res.status(200).json(ordered);
    } catch (error) {
        return res.status(500).json("No funciona")
    }
});

route.get("/bygender", async (req, res) => {
    try {
        const women = await getWomen(1);
        const men = await getMen(2);
        return res.json({ women, men })

    } catch (error) {
        error
    }
});

route.get("/bycat", async (req, res) => {
    try {
        let productsByCategory = await getByCategory();
        if (productsByCategory === null) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json(productsByCategory);
    } catch (e) {
        return res.status(500).json({ message: e.data })
    }
});

route.get("/bycol", async (req, res) => {
    const { id } = req.query;
    try {
        let productsByCategory = await getByCollection(id)
        if (productsByCategory === null) {
            return res.status(404).json({ message: "Collection not found" });
        }
        return res.status(200).json(productsByCategory);
    } catch (e) {
        return res.status(500).json({ message: e.data })
    }
});

route.get("/byoffer", async (req, res) => {
    const { offer } = req.query;
    try {
        let productsByOffer = await getByOffer(offer)
        if (productsByOffer === null) {
            return res.status(404).json({ message: "There aren't items found." });
        }
        return res.status(200).json(productsByOffer);
    } catch (e) {
        return res.status(500).json({ message: e.data })
    }
});

route.patch("/update", verify_admin_token, async (req, res) => {
        jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
          if(error){
            res.status(403).send({message:"Forbidden Access"});
          } else {
            res.json({message:"Acceso autorizado",
                      authData})
          }
        })
        try {
            const updatedProduct = req.body;
            const response = await updateProducts(updatedProduct);
            return response?.msg
                ? res.status(404).json(response)
                : res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Se rompio todo.');
        }
    }
);

route.patch("/delete/:id", verify_admin_token, async (req, res) => {
        jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
          if(error){
            res.status(403).send({message:"Forbidden Access"});
          } else {
            res.json({message:"Acceso autorizado",
                      authData})
          }
        })
        try {
            const { id } = req.params;
            const response = await deleteProduct(id);
            return response.msg
                ? res.status(404).json(response)
                : res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Se rompio todo.');
        }
    }
);

route.get("/getReviews",
    async (req, res) => {
        let flags = req.query;
        try {
            let response = await getReviews(flags);
            return response.msg
                ? res.status(404).json(response)
                : res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Se rompio todo.');
        }
    }
);

route.get("/getByMoreRecent",
    async (req, res) => {
        try {
            let { order } = req.query;
            const response = await getByMoreRecent(order);
            return response.msg
                ? res.status(404).json(response)
                : res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Se rompio todo.');
        }
    }
);

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
            let { filters, offer, category, collection } = req.query;
            offer = offer ? offer : null;
            category = category ? category : null;
            collection = collection ? collection : null;
            let nested = {
              offer: JSON.parse(offer),
              collection: JSON.parse(collection),
              category: JSON.parse(category),
            }
            filters = filters ? filters.split(" ") : null;
            let response;
            if (filters) response = await getProductBySuperSearch(filters);
            if (!filters) response = await getAllProducts(nested);
            return response.msg
                ? res.status(404).json({ message: `not found` })
                : res.status(200).json(response);
        } catch (error) {
            console.log(error);
            return res.status(500).json('Se rompio todo.');
        }
    }
);

route.post("/add", verify_admin_token, async (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
      if(error){
        res.status(403).send({message:"Forbidden Access"});
      } else {
        res.json({message:"Acceso autorizado",
                  authData})
      }
    })
    const product = req.body
    try {
        const newProduct = await createProduct(product);
        console.log(newProduct);
        return res.json(newProduct)

    } catch (error) {
        return res.json({ "message": error.data, "nota": newProduct })
    }
});


module.exports = route;
