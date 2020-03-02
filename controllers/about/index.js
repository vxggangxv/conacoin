const express = require('express');
const router = express.Router();
const ctrl = require('./about.ctrl');
const paginate = require('express-paginate');
const csrfProtection = require('../../middleware/csrf');
const upload = require('../../middleware/inquirysMulter');

router.get('/', ctrl.index);

module.exports = router;