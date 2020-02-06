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

        res.render('support/inquiry/list.html', {
            inquirys,
            pageCount,
            pages,
        });
    } catch (e) {
        console.log(e);
    }
}
exports.get_detail = async (req, res) => {
    try {
        const inquiry = await models.Inquirys.findOne({
            where: {
                id: req.params.id,
            },
            include: ['Reply']
        });
        res.render('support/inquiry/detail.html', {
            inquiry
        })
    } catch (e) {
        console.log(e);
    }
}
exports.post_detail = async (req, res) => {
    try {
        const requiry = await models.Inquirys.findByPk(req.params.id);
        let reply_cnt = 0;
        if (!requiry.reply_cnt) {
            reply_cnt++;
        } else {
            reply_cnt = requiry.reply_cnt + 1;
        }
        await models.Inquirys.update({
            reply_cnt: reply_cnt
        }, {
            where: {
                id: req.params.id
            }
        });
        await requiry.createReply(req.body);
        res.redirect(`/support/inquiry/detail/${req.params.id}`);
    } catch (e) {
        console.log(e);
    }
}
exports.get_write = async (req, res) => {
    res.render('support/inquiry/edit.html', {
        csrfToken: req.csrfToken()
    });
}
exports.post_write = async (req, res) => {
    try {
        await models.Inquirys.create(req.body);
        res.redirect('/support/inquiry/')
    } catch (e) {
        console.log(e);
    }
}
// exports.get_edit = async (req, res) => {
//     res.render('support/inquiry/edit.html', {
//         csrfToken: req.csrfToken()
//     });
// }
// exports.post_edit = async (req, res) => {
//     try {
//         await models.Inquirys.update(req.body);
//         res.redirect('/support/inquiry/')
//     } catch (e) {
//         console.log(e);
//     }
// }
exports.get_delete = async (req, res) => {
    try {
        await models.Inquirys.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/support/inquiry/');
    } catch (e) {
        console.log(e);
    }
}

exports.post_reply_edit = async (req, res) => {
    try {
        // const requiry = await models.Inquirys.findByPk(req.params.id);
        // await requiry.updateReply(req.body);
        await models.InquirysReply.update(
            req.body, {
                where: {
                    inquiry_id: req.params.id
                }
            }
        );
        res.redirect(`/support/inquiry/detail/${req.params.id}`);
    } catch (e) {
        console.log(e);
    }
}

exports.get_reply_delete = async (req, res) => {
    try {
        await models.InquirysReply.destroy({
            where: {
                inquiry_id: req.params.id
            }
        });
        res.redirect(`/support/inquiry/detail/${req.params.id}`);
    } catch (e) {
        console.log(e);
    }
}