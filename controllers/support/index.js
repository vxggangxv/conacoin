const express = require('express');
const router = express.Router();
const ctrl = require('./support.ctrl');
const paginate = require('express-paginate');
const csrfProtection = require('../../middleware/csrf');

router.get('/inquiry', paginate.middleware(10, 50), ctrl.get_inquiry);
router.get('/inquiry/write', csrfProtection, ctrl.get_write);
router.post('/inquiry/write', ctrl.post_write);
router.get('/inquiry/detail/:id', ctrl.get_detail);
router.post('/inquiry/detail/:id', ctrl.post_detail);
// router.get('/inquiry/edit/:id', csrfProtection, ctrl.get_edit);
// router.post('/inquiry/edit/:id', ctrl.post_edit);
router.get('/inquiry/delete/:id', ctrl.get_delete);

router.post('/inquiry/reply/edit/:id', ctrl.post_reply_edit);
router.get('/inquiry/reply/delete/:id', ctrl.get_reply_delete);
// router.delete('/inquiry/reply/delete/:id', ctrl.delete_reply);




module.exports = router;