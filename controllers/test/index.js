const router = require('express').Router();
const ctrl = require('./test.ctrl')

router.get('/', ctrl.index);
router.get('/crawling', ctrl.get_crawling);

module.exports = router;