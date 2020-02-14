const express = require('express');
const router = express.Router();
const ctrl = require('./foblgate.ctrl')

router.post('/foblgate/ticker/order', ctrl.ticker_order);
router.post('/foblgate/ticker/public', ctrl.ticker_public);
router.post('/foblgate/account/balance', ctrl.account_balance);

module.exports = router;