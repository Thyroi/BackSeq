const route = require("express").Router();
const { mailer } = require("../controllers/Mailer");
const { Hora, genOffer } = require('../controllers/Offers');

route.get("/hora", async (req, res) => {
    const day = await Hora();
    const info = await genOffer(day);
    return res.json(info)
});
route.get("/email", async (req, res) => {
    const mail = await mailer();
    return res.json(mail)
});
module.exports = route;