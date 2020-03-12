const express = require('express');
const router = express.Router();
const ctrl = require('./home.ctrl');

router.get('/', ctrl.index);
router.get('/home', ctrl.get_home);
router.get('/siteinfo/:id', ctrl.get_siteinfo);

module.exports = router;