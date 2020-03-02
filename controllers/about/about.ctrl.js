const models = require('../../database/models')
const paginate = require('express-paginate')
const path = require('path')

exports.index = (req, res) => {
    res.render('about/index.html')
}