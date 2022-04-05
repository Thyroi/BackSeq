const route = require("express").Router();
const { Hora, genOffer} = require('../controllers/Offers');

 route.get("/hora", async (req, res)=>{
     const day = await Hora();
     const info = await genOffer(day);
    return res.json(info)
 });

module.exports = route;