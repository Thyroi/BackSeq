const route = require("express").Router();
const {
    createReview,
    updateReview,
    getReviews,
    deleteReview
} = require('../controllers/Reviews');
const verify_client_token = require('../controllers/verify_client_token.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

route.get("/get", async (req, res) => {
    const filters = req.query;
    try {
        let reviews = await getReviews(filters);
        return reviews
            ? res.status(200).json(reviews)
            : res.status(404).json({ msg: `something go wrong. \n ${reviews}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json('rompiste todo.');
    }
});

route.post("/create", verify_client_token, async (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
      if(error){
        res.status(403).send({message:"Forbidden Access"});
      } else {
        res.json({message:"Authorized Access",
                  authData})
      }
    })
    const review = req.body;
    try {
        let response = await updateReview(review);
        if (!response.updated) response = await createReview(review);
        return response.msg
            ? res.status(404).json(response)
            : res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json(`rompiste todo.\n${error}`);
    }
});

route.patch("/update", verify_client_token, verify_client_token, async (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
      if(error){
        res.status(403).send({message:"Forbidden Access"});
      } else {
        res.json({message:"Authorized Access",
                  authData})
      }
    })
    const review = req.body;
    try {
        let updated = await updateReview(review);
        return updated.msg
            ? res.status(404).json(updated)
            : res.status(200).json(updated);
    } catch (error) {
        console.log(error);
        return res.status(500).json('rompiste todo.');
    }
});

route.delete("/delete", verify_client_token, async (req, res) => {
    jwt.verify(req.token, process.env.SECRET_KEY, (error, authData) => {
      if(error){
        res.status(403).send({message:"Forbidden Access"});
      } else {
        res.json({message:"Authorized Access",
                  authData})
      }
    })
    const review = req.query;
    try {
        let tDeleted = await deleteReview(review);
        return tDeleted > 0
            ? res.status(200).json({ msg: `${tDeleted} review/s deleted.` })
            : res.status(404).json({ msg: `Check id product and user. ${tDeleted} reviews afected.` });
    } catch (error) {
        console.log(error);
        return res.status(500).json('rompiste todo.');
    }
});

module.exports = route;
