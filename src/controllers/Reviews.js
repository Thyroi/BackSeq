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
                    ClientPhone: user ? user : { [Op.ne]: null },
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
    if(stars<1 || stars>5) return { msg: '1-5 valid range.', updated: false };
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
        if(stars<1 || stars>5) return { msg: '1-5 valid range.', updated: false };
        const tProduct = await Products.findByPk(parseInt(product));
        if (!tProduct) return { msg: 'Product not found.', updated: false };
        const tClient = await Client.findByPk(parseInt(user));
        if (!tClient) return { msg: 'Client not found.', updated: false };
        const tReview = await Review.findOne({
            where: {
                ClientPhone: user,
                ProductIdProduct: product
            }
        });
        if (!tReview) return { msg: 'Review not found.', updated: false };
        
        const updProduct = await tProduct.update({ reviews_score: (tProduct.reviews_score - tReview.stars) + stars })
        const updReview = await tReview.update({ stars: stars, description: description });

        return { updated: true, updProduct, updReview }
    } catch (error) {
        console.log("ERROR____________\n" + error);
        return { updated: false, msg: error.data }
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