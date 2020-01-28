const express = require('express');
const router = express.Router();
const ctrl = require('./inquiry.ctrl')

router.get('/', ctrl.index);
router.get('/detail', ctrl.detail);
router.get('/edit', ctrl.edit);

module.exports = router;