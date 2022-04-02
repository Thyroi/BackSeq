const router = require('express').Router();
const products = require('./products');
const populate = require('./populate.js');
const collection = require('./collection');

router.use('/populate', populate);
router.use('/products', products);
router.use('/collection', collection);


module.exports = router;
