const express = require('express')
const router = express.Router()
const models = require('../../database/models')
const ctrl = require('./admin.ctrl')

const adminRequired = require('../../middleware/adminRequired');
const csrfProtection = require('../../middleware/csrf');

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passwordHash = require('../../helpers/passwordHash')

passport.use(
    new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            // 조회
            const user = await models.User.findOne({
                where: {
                    username,
                    password: passwordHash(password),
                },
                // attributes: { exclude: ['password'] }
            })

            // 유저에서 조회되지 않을시
            if (!user) {
                return done(null, false, {
                    message: '일치하는 아이디 패스워드가 존재하지 않습니다.',
                })

                // 유저에서 조회 되면 세션등록쪽으로 데이터를 넘김
            } else {
                return done(null, user.dataValues)
            }
        },
    ),
)

passport.serializeUser((user, done) => {
    console.log('serializeUser')
    done(null, user)
})

passport.deserializeUser((user, done) => {
    const result = user
    result.password = ''
    console.log('deserializeUser')
    done(null, result)
})

// router.use(adminRequired);

router.get('/', ctrl.index);
router.get('/join', csrfProtection, ctrl.get_join);
router.post('/join', ctrl.post_join);
router.get('/login', csrfProtection, ctrl.get_login);
router.post(
    '/login',
    passport.authenticate('local', {
        failureRedirect: '/admin/login',
        failureFlash: true,
    }),
    ctrl.post_login,
);
router.get('/logout', ctrl.logout);
router.get('/password', csrfProtection, ctrl.get_password);
router.post('/password', ctrl.post_password);

module.exports = router;