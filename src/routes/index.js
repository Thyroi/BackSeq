const router = require('express').Router();
const products = require('./products.js');
const populate = require('./populate.js');
const collection = require('./collection');
const users = require('./users');
const client = require('./client');
const cart = require('./cart');
const selectors = require('./selectors');
const review = require('./review');
const offers = require('./offers');

router.use('/populate', populate);
router.use('/products', products);
router.use('/reviews', review);
router.use('/selectors', selectors);
router.use('/collection', collection);
router.use('/users', users);
router.use('/client', client);
router.use('/cart', cart);
router.use('/offers', offers);


router.use('/reviews', review);

module.exports = router;
