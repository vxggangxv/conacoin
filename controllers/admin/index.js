const express = require('express');
const router = express.Router();
const ctrl = require('./admin.ctrl');

router.get('/', ctrl.index);
router.get('/signin', ctrl.signin);

module.exports = router;