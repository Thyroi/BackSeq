const route = require("express").Router();
const {
    createList,
    updateList,
    getList,
    deleteList,
    sendOffers,
    shareList,
    getListByIdAndTitle
} = require('../controllers/List');

// const verify_client_token = require('../controllers/verify_client_token.js');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

route.get("/get", async (req, res) => {
    const filters = req.query;
    try {
        let lists = await getList(filters);
        return lists
            ? res.status(200).json(lists)
            : res.status(404).json({ msg: `something go wrong. \n ${lists}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json('rompiste todo.');
    }
});
route.get("/getbyidandtitle", async (req, res) => {
    const filters = req.query;
    try {
        let lists = await getListByIdAndTitle(filters);
        return lists.length
            ? res.status(200).json(lists)
            : res.status(404).json({ msg: `no se encontro, naranja. \n ${lists}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json('rompiste todo.');
    }
});
route.get("/offer", async (req, res) => {
    try {
        let lists = await sendOffers();
        return lists
            ? res.status(200).json(lists)
            : res.status(404).json({ msg: `something go wrong. \n ${lists}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json('rompiste todo.');
    }
});
route.post("/create", async (req, res) => {
    const list = req.body;
    try {
        response = await createList(list);
        return response.msg
            ? res.status(404).json(response)
            : res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json('rompiste todo.');
    }
});
route.patch("/update",async (req, res) => {
    const list = req.body;
    try {
        let updated = await updateList(list);
        return !updated[0]
            ? res.status(404).json({ message: "Check list id." })
            : res.status(200).json({ message: `Updated list ${updated[0]}.`});
    } catch (error) {
        console.log(error);
        return res.status(500).json('rompiste todo.');
    }
});
route.patch('/share', async (req, res) => {
    const list = req.body;
    const share = await shareList(list);
    return !share
        ? res.status(404).json({ message: "Check list id." })
        : res.status(200).json({ message: `Updated list.`});
});
route.delete("/delete", async (req, res) => {
    const {id} = req.query;
    try {
        let tDeleted = await deleteList(parseInt(id));
        return tDeleted > 0
            ? res.status(200).json({ msg: `${tDeleted} list deleted.` })
            : res.status(404).json({ msg: `Check list id. ${tDeleted} list afected.` });
    } catch (error) {
        console.log(error);
        return res.status(500).json('rompiste todo.');
    }
});

module.exports = route;
