const router = require('express').Router();
const products = require('./products.js');
const populate = require('./populate.js');
const collection = require('./collection');
const selectors = require('./selectors');
// const users = require('./users');
// const client = require('./client');

router.use('/populate', populate);
router.use('/products', products);
router.use('/selectors', selectors);
router.use('/collection', collection);
// router.use('/users', users);
// router.use('/client', client);


module.exports = router;
