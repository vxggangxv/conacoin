const express = require('express');
const router = express.Router();
const visitorCounter = require('../middleware/visitorCounter');

router.use(visitorCounter);

router.use('/', require('./home'));
router.use('/notice', require('./notice'));
router.use('/about', require('./about'));
router.use('/guide', require('./guide'));
router.use('/support', require('./support'));
router.use('/conaservice', require('./admin'));
router.use('/test', require('./test'));

router.use('/api', require('./api'));
// router.use('/auth', require('./auth'));
// router.use('/chat', require('./chat'));
// router.use('/accounts', require('./accounts'));
// router.use('/products', require('./products'));
// router.use('/cart', require('./cart'));
// router.use('/checkout', require('./checkout'));
// router.use('/admin', require('./admin'));

module.exports = router;