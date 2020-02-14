const router = require('express').Router();
const ctrl = require('./test.ctrl')

router.get('/', ctrl.index);
router.get('/crawl', ctrl.get_crawl);

module.exports = router;