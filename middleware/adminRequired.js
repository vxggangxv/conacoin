module.exports = function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/admin/login');
    } else {
        if (req.user.username !== 'master') {
            res.send('<script>alert("관리자만 접근가능합니다.");\
            location.href="/admin/login";</script>');
        } else {
            return next();
        }
    }
};