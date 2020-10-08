const express = require('express');
const router = express.Router();
const ctrl = require('./support.ctrl');
const paginate = require('express-paginate');
const csrfProtection = require('../../middleware/csrf');
const upload = require('../../middleware/multer/');

router.get('/', ctrl.index);
router.get('/inquirys', paginate.middleware(10, 50), ctrl.get_inquirys);
router.get('/inquirys/write', csrfProtection, ctrl.get_inquirys_write);
router.post('/inquirys/write', csrfProtection, upload('inquirys').array('file', 5), ctrl.post_inquirys_write);
router.get('/inquirys/detail/:id', csrfProtection, ctrl.get_inquirys_detail);
// router.get('/inquirys/edit/:id', csrfProtection, ctrl.get_inquirys_edit);
// router.post('/inquirys/edit/:id', ctrl.post_inquirys_edit);
router.get('/inquirys/delete/:id', ctrl.get_inquirys_delete);

router.post('/inquirys/reply/write/:id', csrfProtection, ctrl.post_inquirys_reply_write);
router.post('/inquirys/reply/edit/:id', csrfProtection, ctrl.post_inquirys_reply_edit);
router.get('/inquirys/reply/delete/:id', ctrl.get_inquirys_reply_delete);
// router.delete('/inquirys/reply/delete/:id', ctrl.delete_reply);

router.post('/inquirys/check', ctrl.inquirys_check);
router.post('/inquirys/lock', ctrl.inquirys_lock);

router.get('/faq', ctrl.get_faq);

module.exports = router;