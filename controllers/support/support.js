const models = require('../../models');


exports.index = async (req, res) => {
    res.render('support/list.html', {});
}
exports.detail = async (req, res) => {
    res.render('support/detail.html', {});
}
exports.edit = async (req, res) => {
    res.render('support/edit.html', {});
}