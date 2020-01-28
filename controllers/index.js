const {
    Router
} = require('express');
const router = Router()

router.use('/', require('./home'));
router.use('/', require('./inquiry'));
// router.use('/admin', require('./admin'));
// router.use('/auth', require('./auth'));
// router.use('/chat', require('./chat'));
// router.use('/accounts', require('./accounts'));
// router.use('/products', require('./products'));
// router.use('/cart', require('./cart'));
// router.use('/checkout', require('./checkout'));
// router.use('/admin', require('./admin'));

module.exports = router;