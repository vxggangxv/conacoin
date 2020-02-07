const models = require('../../database/models');
const paginate = require('express-paginate');

exports.index = (req, res) => {
    res.redirect('/admin/inquirys/')
}
exports.get_join = (req, res) => {
    res.render('admin/accounts/join.html', {
        csrfToken: req.csrfToken()
    });
}
exports.post_join = async (req, res) => {
    try {
        let {
            username,
            password
        } = req.body;
        const user = await models.User.findOne({
            where: {
                username: username
            }
        })
        if (user) {
            res.send('<script>alert("이미 존재하는 아이디입니다.");\
            location.href="/admin/accounts/join";</script>');
            return;
        }
        if (!user) {
            await models.User.create({
                username: username,
                password: password
            })
            res.send('<script>alert("가입 성공");\
            location.href="/admin/accounts/login";</script>');
        }
    } catch (e) {
        console.log(e);
    }
    // res.send('<script>alert("가입 성공");\
    // location.href="/admin/accounts/join";</script>');
}
exports.get_login = (req, res) => {
    res.render('admin/accounts/login.html', {
        flashMessage: req.flash().error,
        csrfToken: req.csrfToken()
    });
}
exports.post_login = async (req, res) => {
    res.send('<script>alert("로그인 성공");\
    location.href="/admin";</script>');
}
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/admin/accounts/login');
};
exports.get_password = (req, res) => {
    res.render('admin/accounts/password.html', {
        csrfToken: req.csrfToken()
    });
}
exports.post_password = async (req, res) => {
    try {
        let {
            password_new
        } = req.body;

        // const user = await models.User.findOne({
        //     where: {
        //         username: req.user.username
        //     }
        // })
        // if (user.password != password_old) {
        //     res.send('<script>alert("기존 패스워드가 일치하지 않습니다. ");\
        //     location.href="/admin/accounts/password";</script>');
        //     return;
        // }

        await models.User.update({
            password: password_new
        }, {
            individualHooks: true,
            where: {
                id: req.user.username
            }
        })

        res.send('<script>alert("변경 성공");\
        location.href="/admin/accounts/password";</script>');
    } catch (e) {
        console.log(e);
    }
}

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
        const limit = req.query.limit;

        res.render('admin/inquirys/list.html', {
            inquirys,
            pageCount,
            pages,
            limit
        });
    } catch (e) {
        console.log(e);
    }
}

exports.get_inquirys_write = async (req, res) => {}
exports.post_inquirys_write = async (req, res) => {}
exports.get_inquirys_detail = async (req, res) => {
    try {
        const inquiry = await models.Inquirys.findOne({
            where: {
                id: req.params.id,
            },
            include: ['Reply']
        });
        res.render('admin/inquirys/detail.html', {
            inquiry
        })
    } catch (e) {

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
        res.redirect(`/admin/inquirys/detail/${req.params.id}`);
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
        res.redirect(`/admin/inquirys/detail/${req.params.id}`);
    } catch (e) {
        console.log(e);
    }
}
exports.get_inquirys_write = async (req, res) => {
    res.render('admin/inquirys/edit.html', {
        csrfToken: req.csrfToken()
    });
}
exports.post_inquirys_write = async (req, res) => {
    try {
        await models.Inquirys.create(req.body);
        res.redirect('/admin/inquirys/')
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
        res.redirect('/admin/inquirys/');
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
        res.redirect(`/admin/inquirys/detail/${req.params.id}`);
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
        res.redirect(`/admin/inquirys/detail/${req.params.id}`);
    } catch (e) {
        console.log(e);
    }
}