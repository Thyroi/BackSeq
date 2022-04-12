const route = require("express").Router();
const { mailer } = require("../controllers/Mailer");
const { getItems, genOffer } = require('../controllers/Offers');

route.get("/hora", async (req, res) => {
    const info = await getItems()
    const updated = await genOffer(info);
    return res.json(updated)
});
route.get("/email", async (req, res) => {
    const mail = await mailer();
    return res.json(mail)
});
module.exports = route;