const models = require('../../models');

exports.index = async (req, res) => {
    res.render('admin/user/index.html', {});
}
exports.signin = async (req, res) => {
    res.render('admin/signin.html', {});
}