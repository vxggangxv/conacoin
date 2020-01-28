const models = require('../../models');


exports.index = async (req, res) => {
    res.render('inquiry/list.html', {});
}
exports.detail = async (req, res) => {
    res.render('inquiry/detail.html', {});
}
exports.edit = async (req, res) => {
    res.render('inquiry/edit.html', {});
}