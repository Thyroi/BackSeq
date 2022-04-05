const { Sequelize, Op } = require('sequelize');
const { Reviews } = require('../db.js');

const getReviews = async (filters) => {
    const { user, product } = filters
    console.log(filters)
    try {
        const review = await Reviews.findAll();
        return review;
    } catch (error) {
        return error.data
    }
}
        //     {
        //     // where: {
        //     //     user: `%`
        //     // }
        //         // user: { [Op.like]: !user ? '%' : user },
        //         // product: { [Op.like]: !product ? '%' : product }
        // }

const createReview = async (review) => {
    const { start, description, user, product } = review
    try {
        const review = await Reviews.create({
            stars: start,
            description: description,
            user: user,
            product: product
        });
        return review;
    } catch (error) {
        return error.data
    }
}

const updateReview = async (review) => {
    const { start, description, user, product } = review
    try {
        const review = await Reviews.update({
            stars: start,
            description: description
        }, {
            where: {
                user: parseInt(user),
                product: parseInt(product)
            }
        });
        return review;
    } catch (error) {
        return error.data
    }
}

module.exports = {
    createReview,
    updateReview,
    getReviews
    // deleteReview,
};