const models = require('../../database/models');
const paginate = require('express-paginate');

exports.index = (req, res) => {
    res.redirect('/admin/inquirys')
}
// 로그인, 회원가입
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
            res.send('<script>location.href="/admin/accounts/login";</script>');
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
    res.send('<script>location.href="/admin";</script>');
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

        await models.User.update({
            password: password_new
        }, {
            individualHooks: true,
            where: {
                username: req.user.username
            }
        });

        res.send('<script>alert("변경 성공");\
            location.href="/admin";</script>');

    } catch (e) {
        console.log(e);
    }
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
            models.Inquirys.count(),
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
exports.get_inquirys_write = async (req, res) => {
    res.render('admin/inquirys/edit.html', {
        csrfToken: req.csrfToken()
    });
}
exports.post_inquirys_write = async (req, res) => {
    try {
        const path = require('path');
        const items = req.files;

        await models.Inquirys.create(req.body).then(result => {
            let inquiry_id = result.id;
            items.forEach(async item => {
                let originalname = item.originalname;
                let filename = item.filename;
                let size = item.size;
                let destination = item.destination;
                let extension = path.extname(item.originalname);
                await models.InquirysAttach.create({
                    originalname,
                    filename,
                    size,
                    destination,
                    extension,
                    inquiry_id
                });
            })
        })
        res.redirect('/admin/inquirys')
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
            include: ['Reply', 'Attach']
        });
        res.render('admin/inquirys/detail.html', {
            inquiry
        })
    } catch (e) {

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
        res.redirect('/admin/inquirys')
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
        res.redirect('/admin/inquirys');
    } catch (e) {
        console.log(e);
    }
}
exports.post_inquirys_reply_write = async (req, res) => {
    try {
        const inquiry = await models.Inquirys.findByPk(req.params.id);
        let reply_cnt = 0;
        if (!inquiry.reply_cnt) {
            reply_cnt++;
        } else {
            reply_cnt = inquiry.reply_cnt + 1;
        }
        await models.Inquirys.update({
            reply_cnt: reply_cnt
        }, {
            where: {
                id: req.params.id
            }
        });
        await inquiry.createReply(req.body);
        res.redirect(`/admin/inquirys/detail/${req.params.id}`);
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

// 문의하기 정렬
exports.post_inquirys_sort = async (req, res) => {
    try {
        let {
            sort
        } = req.body;
        let order = [];
        if (sort !== 'createdAt') {
            order = [
                [sort, 'desc'],
                ['createdAt', 'desc']
            ]
        } else {
            order = [
                ['createdAt', 'desc']
            ]
        }
        const [inquirys, totalCount] = await Promise.all([
            models.Inquirys.findAll({
                limit: req.query.limit,
                offset: req.offset,
                order
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
            limit,
            sort
        });
    } catch (e) {
        console.log(e);
    }
}

// 뉴스
exports.get_news = async (req, res) => {
    try {
        const [news, totalCount] = await Promise.all([
            models.News.findAll({
                limit: req.query.limit,
                offset: req.offset,
                order: [
                    ['createdAt', 'desc']
                ]
            }),
            models.News.count()


        ]);
        const pageCount = Math.ceil(totalCount / req.query.limit);
        const pages = paginate.getArrayPages(req)(5, pageCount, req.query.page);
        // const inquirys = await models.Inquirys.findAll();

        res.render('admin/news/list.html', {
            news,
            pageCount,
            pages,
        });
    } catch (e) {
        console.log(e);
    }
}
exports.get_news_detail = async (req, res) => {
    try {
        const news = await models.News.findOne({
            where: {
                id: req.params.id,
            }
        });
        res.render('admin/news/detail.html', {
            news
        })
    } catch (e) {
        console.log(e);
    }
}
exports.get_news_write = async (req, res) => {
    res.render('admin/news/edit.html', {
        csrfToken: req.csrfToken()
    });
}
exports.post_news_write = async (req, res) => {
    try {
        await models.News.create(req.body);
        res.redirect('/admin/news')
    } catch (e) {
        console.log(e);
    }
}
exports.get_news_edit = async (req, res) => {
    const news = await models.News.findOne({
        where: {
            id: req.params.id,
        }
    })
    res.render('admin/news/edit.html', {
        csrfToken: req.csrfToken(),
        news
    });
}
exports.post_news_edit = async (req, res) => {
    try {
        await models.News.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        res.redirect(`/admin/news/detail/${req.params.id}`);
    } catch (e) {
        console.log(e);
    }
}
exports.get_news_delete = async (req, res) => {
    try {
        await models.News.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/admin/news');
    } catch (e) {
        console.log(e);
    }
}