const router = require('express').Router();
const products = require('./products');
const populate = require('./populate.js');
const collection = require('./collection');
const users = require('./users');
const client = require('./client');
const cart = require('./cart');

router.use('/populate', populate);
router.use('/products', products);
router.use('/collection', collection);
router.use('/users', users);
router.use('/client', client);
router.use('/cart', cart);


//  const cart= require('./cart.js');
// router.use('/cart', cart);


module.exports = router;
