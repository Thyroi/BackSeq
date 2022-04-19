const route = require("express").Router();
const mailer = require("../controllers/Mailer");
const { getItems, genOffer, newOffer } = require('../controllers/Offers');

route.patch("/setoff", async (req, res) => {
    const info = await getItems()
    const updated = await genOffer(info);
    return res.json(updated)
});
route.get("/email", async (req, res) => {
    const mail = await mailer({type : "offers", discount: "10"});
    return res.json(mail)
});
route.patch("/newOffer", async (req, res) => {
    const info = req.body;
    const genOffer = await newOffer(info);
    return res.status(200).json("Las ofertas se han actualizado");
}
);
module.exports = route;