const models = require('../../database/models');
const paginate = require('express-paginate');

exports.index = (req, res) => {
    res.redirect('/support/inquirys/')
}
// 문의하기
exports.get_inquirys = async (req, res) => {
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
        const pages = paginate.getArrayPages(req)(5, pageCount, req.query.page);
        // const inquirys = await models.Inquirys.findAll();

        inquirys.forEach(item => {
            item.name = item.name.substr(0, 1) + '****';
            console.log(item);
        });

        res.render('support/inquirys/list.html', {
            inquirys,
            pageCount,
            pages,
        });
    } catch (e) {
        console.log(e);
    }
}
exports.get_inquirys_detail = async (req, res) => {
    try {
        const inquiry = await models.Inquirys.findOne({
            where: {
                id: req.params.id,
            },
            include: ['Reply']
        });
        res.render('support/inquirys/detail.html', {
            inquiry
        })
    } catch (e) {
        console.log(e);
    }
}
exports.get_inquirys_write = async (req, res) => {
    res.render('support/inquirys/edit.html', {
        csrfToken: req.csrfToken()
    });
}
exports.post_inquirys_write = async (req, res) => {
    try {
        await models.Inquirys.create(req.body);
        res.redirect('/support/inquirys/')
    } catch (e) {
        console.log(e);
    }
}
// exports.get_edit = async (req, res) => {
//     res.render('support/inquirys/edit.html', {
//         csrfToken: req.csrfToken()
//     });
// }
// exports.post_edit = async (req, res) => {
//     try {
//         await models.Inquirys.update(req.body);
//         res.redirect('/support/inquirys/')
//     } catch (e) {
//         console.log(e);
//     }
// }
exports.get_inquirys_delete = async (req, res) => {
    try {
        await models.Inquirys.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/support/inquirys/');
    } catch (e) {
        console.log(e);
    }
}
exports.post_inquirys_reply_write = async (req, res) => {
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
        res.redirect(`/support/inquirys/detail/${req.params.id}`);
    } catch (e) {
        console.log(e);
    }
}
exports.post_inquirys_reply_edit = async (req, res) => {
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
        res.redirect(`/support/inquirys/detail/${req.params.id}`);
    } catch (e) {
        console.log(e);
    }
}

exports.get_inquirys_reply_delete = async (req, res) => {
    try {
        await models.InquirysReply.destroy({
            where: {
                inquiry_id: req.params.id
            }
        });
        res.redirect(`/support/inquirys/detail/${req.params.id}`);
    } catch (e) {
        console.log(e);
    }
}

exports.inquirys_check = async (req, res) => {
    try {
        let status = null;
        const {
            inquiry_id,
            inquiry_password
        } = req.body;
        const inquiry = await models.Inquirys.findOne({
            where: {
                id: inquiry_id,
                password: inquiry_password
            }
        });
        if (inquiry) {
            status = true;
        }
        res.json({
            inquiry,
            status
        })
    } catch (e) {
        console.log(e);
    }
}