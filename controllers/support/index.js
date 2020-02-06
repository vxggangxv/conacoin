const express = require('express');
const router = express.Router();
const ctrl = require('./support.ctrl');
const paginate = require('express-paginate');
const csrfProtection = require('../../middleware/csrf');

router.get('/', paginate.middleware(10, 50), ctrl.get_inquiry);
router.get('/detail/:id', ctrl.get_detail);
router.get('/write', csrfProtection, ctrl.get_write);
router.post('/write', ctrl.post_write);
router.get('/edit', csrfProtection, ctrl.get_edit);
router.post('/edit', ctrl.post_edit);
router.get('/delete/:id', ctrl.get_delete);

module.exports = router;