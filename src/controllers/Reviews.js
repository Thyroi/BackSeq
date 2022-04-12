const { Sequelize, Op } = require('sequelize');
const { Client, Products, Review } = require('../db.js');

const getReviews = async (filters) => {
    let { product, user, rating, orderField, order } = filters
    rating = rating ? rating : 1
    user = user ? parseInt(user) : null;
    product = product ? parseInt(product) : null;
    try {
        const tReviews = await Review.findAll(
            {
                where: {
                    ClientPhone: user ? user : { [Op.ne]: null } ,
                    ProductIdProduct: product ? product : { [Op.ne]: null },
                    stars: {
                        [Op.gte]: rating
                    }
                },
                order: [
                    orderField && order ? [orderField, order] : ['updatedAt', 'DESC']
                ],
                include: [{
                    model: Client,
                    attributes: ['login_name', 'name', 'lastname', 'email']
                }]
            });
        return tReviews;
    } catch (error) {
        console.log(error);
        return error.data
    }
}

const createReview = async (review) => {
    const { stars, description, user, product } = review
    const tReview = {
        stars: stars,
        description: description,
        ClientPhone: parseInt(user)
    }
    try {
        if (!user) return { msg: 'Provide userId.' }
        const tProduct = await Products.findByPk(parseInt(product));
        const CreatedReview = await tProduct?.createReview(tReview);
        tProduct.reviews += 1;
        tProduct.reviews_score += stars;
        tProduct.save()
        return !tProduct
            ? { msg: 'Product not found.' }
            : !CreatedReview
                ? { msg: 'Product ok. Check other fields. ' }
                : CreatedReview;
    } catch (error) {
        console.log('SUIZO VRGA' + error);
        return error.data
    }
}

const updateReview = async (review) => {
    const { stars, description, user, product } = review
    try {
        const review = await Review.update({
            stars: stars,
            description: description
        }, {
            where: {
                ClientPhone: user,
                ProductIdProduct: product
            }
        });
        return review;
    } catch (error) {
        console.log(error);
        return error.data
    }
}

const deleteReview = async ({ idClient, idProduct }) => {
    try {
        const tDeleted = await Review.destroy({
            where: {
                ClientPhone: parseInt(idClient),
                ProductIdProduct: parseInt(idProduct)
            }
        });
        return tDeleted;
    } catch (error) {
        return error.data
    }
}



module.exports = {
    createReview,
    updateReview,
    getReviews,
    deleteReview
};