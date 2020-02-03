const models = require('../../models');

exports.get_join = async (req, res) => {
    res.render('admin/join.html');
}
exports.post_join = async (req, res) => {
    res.render('admin/join.html', {});
}
exports.get_login = async (req, res) => {
    res.render('admin/login.html', {});
}
exports.index = async (req, res) => {
    res.render('admin/user/index.html', {});
}