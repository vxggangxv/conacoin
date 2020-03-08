const express = require('express');
const router = express.Router();
const models = require('../../database/models');
const ctrl = require('./admin.ctrl');

const adminRequired = require('../../middleware/adminRequired');
const csrfProtection = require('../../middleware/csrf');
const upload = require('../../middleware/inquirysMulter');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('../../helpers/passwordHash');

const paginate = require('express-paginate');

passport.use(
    new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            // 조회
            const user = await models.User.findOne({
                where: {
                    username,
                    password: passwordHash(password)
                }
                // attributes: { exclude: ['password'] }
            });

            // 유저에서 조회되지 않을시
            if (!user) {
                return done(null, false, {
                    message: '일치하는 아이디 패스워드가 존재하지 않습니다.'
                });

                // 유저에서 조회 되면 세션등록쪽으로 데이터를 넘김
            } else {
                return done(null, user.dataValues);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    console.log('serializeUser');
    done(null, user);
});

passport.deserializeUser((user, done) => {
    const result = user;
    result.password = '';
    console.log('deserializeUser');
    done(null, result);
});

router.get('/accounts/join', csrfProtection, ctrl.get_join);
router.post('/accounts/join', ctrl.post_join);
router.get('/accounts/login', csrfProtection, ctrl.get_login);
router.post(
    '/accounts/login',
    passport.authenticate('local', {
        failureRedirect: '/conaservice/accounts/login',
        failureFlash: true
    }),
    ctrl.post_login
);

router.use(adminRequired);

router.get('/', ctrl.index);
router.get('/accounts/logout', ctrl.logout);
router.get('/accounts/password', csrfProtection, ctrl.get_password);
router.post('/accounts/password', ctrl.post_password);

router.get('/inquirys', paginate.middleware(10, 50), ctrl.get_inquirys);
router.get('/inquirys/write', csrfProtection, ctrl.get_inquirys_write);
router.post('/inquirys/write', upload.array('file', 5), ctrl.post_inquirys_write);
router.get('/inquirys/detail/:id', ctrl.get_inquirys_detail);
// router.get('/inquirys/edit/:id', csrfProtection, ctrl.get_inquirys_edit);
// router.post('/inquirys/edit/:id', ctrl.post_inquirys_edit);
router.get('/inquirys/delete/:id', ctrl.get_inquirys_delete);

router.post('/inquirys/reply/write/:id', ctrl.post_inquirys_reply_write);
router.post('/inquirys/reply/edit/:id', ctrl.post_inquirys_reply_edit);
router.get('/inquirys/reply/delete/:id', ctrl.get_inquirys_reply_delete);

router.post('/inquirys/reply/email', ctrl.post_inquirys_reply_email);

router.get('/inquirys/sort', paginate.middleware(10, 50), ctrl.get_inquirys_sort);

router.get('/news', paginate.middleware(10, 50), ctrl.get_news);
router.get('/news/write', csrfProtection, ctrl.get_news_write);
router.post('/news/write', ctrl.post_news_write);
router.get('/news/detail/:id', ctrl.get_news_detail);
router.get('/news/edit/:id', csrfProtection, ctrl.get_news_edit);
router.post('/news/edit/:id', ctrl.post_news_edit);
router.get('/news/delete/:id', ctrl.get_news_delete);

router.get('/siteinfo/write', csrfProtection, ctrl.get_siteinfo_write);
router.post('/siteinfo/write', ctrl.post_siteinfo_write);
router.get('/siteinfo/detail/:id', ctrl.get_siteinfo_detail);
router.get('/siteinfo/edit/:id', csrfProtection, ctrl.get_siteinfo_edit);
router.post('/siteinfo/edit/:id', ctrl.post_siteinfo_edit);

module.exports = router;