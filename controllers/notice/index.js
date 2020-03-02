const express = require('express');
const router = express.Router();
const ctrl = require('./notice.ctrl');
const paginate = require('express-paginate');
const csrfProtection = require('../../middleware/csrf');
const upload = require('../../middleware/inquirysMulter');

// router.get('/', ctrl.index);
router.get('/alerts', paginate.middleware(10, 50), ctrl.get_alerts);
router.get('/alerts/detail/:id', ctrl.get_alerts_detail);
router.get('/news', paginate.middleware(10, 50), ctrl.get_news);

module.exports = router;