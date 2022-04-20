const route = require("express").Router();
const { 
    getSearchTerms,
    addSearchTerm,
    getOrders
 } = require('../controllers/Statistics');

 route.get("/get", async (req, res) => {
    try {
        const response = await getOrders();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json("rompiste todo")
    }
});

 route.get("/getSearchTerms", async (req, res) => {
    try {
        const response = await getSearchTerms();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json("rompiste todo")
    }
});

 route.post("/addSearchTerm", async (req, res) => {
     const { term } = req.query;
     console.log(term);
    try {
        const response = await addSearchTerm(term);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json("rompiste todo")
    }
});

module.exports = route;