const route = require("express").Router();
const {
    createReview,
    updateReview,
    getReviews,
    // deleteReview,
} = require('../controllers/Reviews');

route.get("/get", async (req, res) => {
    const filters = req.body;
    try {
        let reviews = await getReviews(filters);
        return reviews
            // ? res.status(200).json(reviews)
            // : res.status(404).json({ message: "something go wrong." });
    } catch (error) {
        console.log(error);
        return res.status(500).json('rompiste todo.');
    }
});

route.post("/create", async (req, res) => {
    const review = req.body;
    try {
        let created = await createReview(review);
        return created
            ? res.status(200).json(created)
            : res.status(404).json({ message: `>>${created}review for this product from this user exist, use /update.` });
    } catch (error) {
        console.log(error);
        return res.status(500).json('rompiste todo.');
    }
});

route.patch("/update", async (req, res) => {
    const review = req.body;
    try {
        let created = await updateReview(review);
        return created
            ? res.status(200).json(created)
            : res.status(404).json({ message: "this product for this user not exist." });
    } catch (error) {
        console.log(error);
        return res.status(500).json('rompiste todo.');
    }
});

module.exports = route;