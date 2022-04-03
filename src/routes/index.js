const router = require('express').Router();
const products = require('./products');
const populate = require('./populate.js');
const collection = require('./collection');
const users = require('./users');
const client = require('./client');

router.use('/populate', populate);
router.use('/products', products);
router.use('/collection', collection);
router.use('/users', users);
router.use('/client', client);


module.exports = router;
