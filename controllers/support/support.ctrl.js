const models = require('../../database/models');


exports.index = async (req, res) => {
    res.render('support/inquiry.html', {});
}
exports.detail = async (req, res) => {
    res.render('support/inquiry_detail.html', {});
}
exports.edit = async (req, res) => {
    res.render('support/inquiry_edit.html', {});
}