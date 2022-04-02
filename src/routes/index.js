const router = require('express').Router();

const populate = require('./populate.js')
// const clients = require('./clients.js');
// const categories = require('./categories.js');
const products = require('./products.js');

router.use('/populate', populate);
router.use('/products', products);
// router.use('/categories',categories);
// router.use('/clients', clients); 

module.exports = router;