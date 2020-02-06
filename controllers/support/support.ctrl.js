const models = require('../../database/models');
const paginate = require('express-paginate');


exports.get_inquiry = async (req, res) => {
    try {
        const [inquirys, totalCount] = await Promise.all([
            models.Inquirys.findAll({
                limit: req.query.limit,
                offset: req.offset,
                order: [
                    ['createdAt', 'desc']
                ]
            }),
            models.Inquirys.count()


        ]);
        const pageCount = Math.ceil(totalCount / req.query.limit);
        const pages = paginate.getArrayPages(req)(4, pageCount, req.query.page);
        // const inquirys = await models.Inquirys.findAll();

        res.render('support/inquiry.html', {
            inquirys,
            pageCount,
            pages,
        });
    } catch (e) {
        console.log(e);
    }
    // res.render('support/inquiry.html', {});
}
exports.get_detail = async (req, res) => {
    try {
        const inquiry = await models.Inquirys.findOne({
            where: {
                id: req.params.id,
            },
            include: ['Reply']
        });
        res.render('support/inquiry_detail.html', {
            inquiry
        })
    } catch (e) {
        console.log(e);
    }
    // res.render('support/inquiry_detail.html', {});
}
exports.get_write = async (req, res) => {
    res.render('support/inquiry_edit.html', {
        csrfToken: req.csrfToken()
    });
}
exports.post_write = async (req, res) => {
    try {
        await models.Inquirys.create(req.body);
        res.send(
            '<script>location.href="/support/";</script>',
        );
    } catch (e) {
        console.log(e);
    }
    // res.render('support/inquiry_edit.html', {});
}
exports.get_edit = async (req, res) => {
    res.render('support/inquiry_edit.html', {
        csrfToken: req.csrfToken()
    });
}
exports.post_edit = async (req, res) => {
    try {
        await models.Inquirys.update(req.body);
        res.send(
            '<script>location.href="/support/";</script>',
        );
    } catch (e) {
        console.log(e);
    }
    // res.render('support/inquiry_edit.html', {});
}
exports.get_delete = async (req, res) => {
    try {
        await models.Inquirys.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/support/');
    } catch (e) {
        console.log(e);
    }
}