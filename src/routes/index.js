const router = require('express').Router();
const products = require('./products.js');
const populate = require('./populate.js');
const selectors = require('./selectors');

router.use('/populate', populate);
router.use('/products', products);
router.use('/selectors', selectors);

module.exports = router;
