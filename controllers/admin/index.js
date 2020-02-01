const express = require('express');
const router = express.Router();
const ctrl = require('./admin.ctrl');

router.get('/', ctrl.index);

module.exports = router;