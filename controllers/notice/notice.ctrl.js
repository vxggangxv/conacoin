const models = require('../../database/models');
const paginate = require('express-paginate');
const path = require('path');

exports.index = (req, res) => {
    res.redirect('/notice/alerts')
}
// 공지사항
exports.get_alerts = async (req, res) => {
    try {
        const [alerts, totalCount] = await Promise.all([
            models.Alerts.findAll({
                limit: req.query.limit,
                offset: req.offset,
                order: [
                    ['id', 'desc']
                ]
            }),
            models.Alerts.count()
        ]);
        const pageCount = Math.ceil(totalCount / req.query.limit);
        const pages = paginate.getArrayPages(req)(5, pageCount, req.query.page);
        // const alerts = await models.Alerts.findAll();

        // alerts.forEach(item => {
        //     item.name = item.name.substr(0, 1) + '****';
        // });

        res.render('notice/alerts/list.html', {
            alerts,
            pageCount,
            pages,
        });
    } catch (e) {
        console.log(e);
    }
}
exports.get_alerts_detail = async (req, res) => {
    try {
        const alert = await models.Alerts.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.render('notice/alerts/detail.html', {
            alert
        })
    } catch (e) {
        console.log(e);
    }
}
// 코나뉴스
exports.get_news = async (req, res) => {
    try {
        const [news, totalCount] = await Promise.all([
            models.News.findAll({
                limit: req.query.limit,
                offset: req.offset,
                order: [
                    ['id', 'desc']
                ]
            }),
            models.News.count()


        ]);
        const pageCount = Math.ceil(totalCount / req.query.limit);
        const pages = paginate.getArrayPages(req)(5, pageCount, req.query.page);
        // const inquirys = await models.Inquirys.findAll();

        res.render('notice/news/list.html', {
            news,
            pageCount,
            pages,
        });
    } catch (e) {
        console.log(e);
    }
}