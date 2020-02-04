const models = require('../../database/models');


exports.index = async (req, res) => {
    res.render('home.html', {});
}