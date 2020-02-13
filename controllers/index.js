const express = require('express');
const router = express.Router();

router.use('/', require('./home'));
router.use('/support', require('./support'));
router.use('/admin', require('./admin'));
router.use('/test', require('./test'));
// router.use('/auth', require('./auth'));
// router.use('/chat', require('./chat'));
// router.use('/accounts', require('./accounts'));
// router.use('/products', require('./products'));
// router.use('/cart', require('./cart'));
// router.use('/checkout', require('./checkout'));
// router.use('/admin', require('./admin'));

module.exports = router;