const express = require('express');
const router = express.Router();
const ctrl = require('./foblgate.ctrl');

router.get('/foblgate/ticker/order', ctrl.ticker_order);
router.get('/foblgate/ticker/public', ctrl.ticker_public);
router.get('/foblgate/account/balance', ctrl.account_balance);

module.exports = router;