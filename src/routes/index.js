const router = require('express').Router();
const products = require('./products');
const populate = require('./populate.js');

router.use('/populate', populate);
router.use('/products', products);


module.exports = router;