const models = require('../../database/models');
const paginate = require('express-paginate');
const path = require('path');
const nodemailer = require('nodemailer');
const env = process.env.NODE_ENV || 'development';
const dotenv = require('dotenv');
dotenv.config(); // LOAD CONFIG
const Op = require('sequelize').Op;

exports.index = (req, res) => {
    res.redirect('/conaservice/inquirys');
};
// 로그인, 회원가입
exports.get_join = (req, res) => {
    res.render('admin/accounts/join.html', {
        csrfToken: req.csrfToken()
    });
};
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
        });
        if (user) {
            res.send('<script>alert("이미 존재하는 아이디입니다.");\
            location.href="/conaservice/accounts/join";</script>');
            return;
        }
        if (!user) {
            await models.User.create({
                username: username,
                password: password
            });
            res.send('<script>location.href="/conaservice/accounts/login";</script>');
        }
    } catch (e) {
        console.log(e);
    }
    // res.send('<script>alert("가입 성공");\
    // location.href="/conaservice/accounts/join";</script>');
};
exports.get_login = (req, res) => {
    res.render('admin/accounts/login.html', {
        flashMessage: req.flash().error,
        csrfToken: req.csrfToken()
    });
};
exports.post_login = async (req, res) => {
    res.send('<script>location.href="/conaservice";</script>');
};
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/conaservice/accounts/login');
};
exports.get_password = (req, res) => {
    res.render('admin/accounts/password.html', {
        csrfToken: req.csrfToken()
    });
};
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
            location.href="/conaservice";</script>');

    } catch (e) {
        console.log(e);
    }
};

// 공지사항
exports.get_alerts = async (req, res) => {
    try {
        const [alerts, totalCount] = await Promise.all([
            models.Alerts.findAll({
                limit: req.query.limit,
                offset: req.offset,
                order: [
                    ['createdAt', 'desc'],
                    ['id', 'desc']
                ]
            }),
            models.Alerts.count()
        ]);
        const pageCount = Math.ceil(totalCount / req.query.limit);
        const pages = paginate.getArrayPages(req)(5, pageCount, req.query.page);
        const limit = req.query.limit;

        res.render('admin/alerts/list.html', {
            alerts,
            pageCount,
            pages,
            limit
        });
    } catch (e) {
        console.log(e);
    }
};
exports.get_alerts_write = async (req, res) => {
    res.render('admin/alerts/edit.html', {
        csrfToken: req.csrfToken()
    });
};
exports.post_alerts_write = async (req, res) => {
    try {
        await models.Alerts.create(req.body);
        res.redirect('/conaservice/alerts');
    } catch (e) {
        console.log(e);
    }
};
exports.get_alerts_detail = async (req, res) => {
    try {
        const alert = await models.Alerts.findOne({
            where: {
                id: req.params.id
            }
        });
        res.render('admin/alerts/detail.html', {
            alert
        });
    } catch (e) {
        console.log(e);
    }
};
exports.get_alerts_edit = async (req, res) => {
    try {
        const alert = await models.Alerts.findOne({
            where: {
                id: req.params.id
            }
        });
        alert.content = alert.content.replace(/<br\s*\/?>/mg, '\n');
        res.render('admin/alerts/edit.html', {
            csrfToken: req.csrfToken(),
            alert
        });
    } catch (e) {
        console.log(e);
    }
};
exports.post_alerts_edit = async (req, res) => {
    try {
        req.body.content = req.body.content.replace(/(?:\r\n|\r|\n)/g, '<br/>');
        await models.Alerts.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.redirect(`/conaservice/alerts/detail/${req.params.id}`);
    } catch (e) {
        console.log(e);
    }
};
exports.get_alerts_delete = async (req, res) => {
    try {
        await models.Alerts.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/conaservice/alerts');
    } catch (e) {
        console.log(e);
    }
};

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
};
exports.get_inquirys_write = async (req, res) => {
    res.render('admin/inquirys/edit.html', {
        csrfToken: req.csrfToken()
    });
};
exports.post_inquirys_write = async (req, res) => {
    try {
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
            });
        });
        res.redirect('/conaservice/inquirys');
    } catch (e) {
        console.log(e);
    }
};
exports.get_inquirys_detail = async (req, res) => {
    try {
        const inquiry = await models.Inquirys.findOne({
            where: {
                id: req.params.id
            },
            include: ['Reply', 'Attach']
        });
        res.render('admin/inquirys/detail.html', {
            inquiry
        });
    } catch (e) {
        console.log(e);
    }
};
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
        res.redirect('/conaservice/inquirys');
    } catch (e) {
        console.log(e);
    }
};
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
        res.redirect(`/conaservice/inquirys/detail/${req.params.id}`);
    } catch (e) {
        console.log(e);
    }
};
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
        res.redirect(`/conaservice/inquirys/detail/${req.params.id}`);
    } catch (e) {
        console.log(e);
    }
};

exports.get_inquirys_reply_delete = async (req, res) => {
    try {
        await models.InquirysReply.destroy({
            where: {
                inquiry_id: req.params.id
            }
        });
        res.redirect(`/conaservice/inquirys/detail/${req.params.id}`);
    } catch (e) {
        console.log(e);
    }
};

// 이메일 전송
exports.post_inquirys_reply_email = async (req, res) => {
    try {
        let date = new Date();
        Date.prototype.yyyymmdd = function () {
            var mm = this.getMonth() + 1; // getMonth() is zero-based
            var dd = this.getDate();

            return [this.getFullYear(),
                (mm > 9 ? '' : '0') + mm,
                (dd > 9 ? '' : '0') + dd
            ].join('');
        };

        let gmail_date = date.yyyymmdd();
        const emailOne = await models.Emails.findOne({
            where: {
                gmail_date
            }
        });

        let gmail_cnt = 0;
        let gmail_total = 500;
        if (!emailOne) {
            gmail_cnt++;
            models.Emails.create({
                gmail_cnt,
                gmail_date
            });
        } else {
            gmail_cnt = emailOne.gmail_cnt + 1;
            models.Emails.update({
                gmail_cnt
            }, {
                where: {
                    gmail_date
                }
            });
        }

        // 인증 메일 발송
        const template = require('../../helpers/email/inquirysReplyTemplate');

        let status = null;
        const {
            email,
            content
        } = req.body;

        // console.log(email);
        // console.log(content);


        let user = '';
        let pass = '';
        if (env == 'development') {
            user = 'toxnsldxn@gmail.com';
            pass = process.env.GMAIL_KEY_DEV;
        } else {
            user = 'conaservice@gmail.com';
            pass = process.env.GMAIL_KEY;
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user, // gmail 계정 아이디를 입력
                pass // gmail 계정의 비밀번호를 입력
            }
        });

        let mailOptions = {
            from: 'Noreply - CONA <noreply@cona.com>', // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
            to: email, // 수신 메일 주소
            subject: '[CONA] 실시간문의 답변드립니다.',
            html: template(content)
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                status = true;
                res.json({
                    gmail_cnt,
                    gmail_total,
                    status
                });
            }
        });

    } catch (e) {
        console.log(e);

    }
};

// 문의하기 정렬
exports.get_inquirys_sort = async (req, res) => {
    try {
        let {
            sort
        } = req.query;
        let order = [];
        if (sort !== 'createdAt') {
            order = [
                [sort, 'desc'],
                ['createdAt', 'desc']
            ];
        } else {
            order = [
                ['createdAt', 'desc']
            ];
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
};

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
            pages
        });
    } catch (e) {
        console.log(e);
    }
};
exports.get_news_write = async (req, res) => {
    res.render('admin/news/edit.html', {
        csrfToken: req.csrfToken()
    });
};
exports.post_news_write = async (req, res) => {
    try {
        await models.News.create(req.body);
        res.redirect('/conaservice/news');
    } catch (e) {
        console.log(e);
    }
};
exports.get_news_edit = async (req, res) => {
    const news = await models.News.findOne({
        where: {
            id: req.params.id
        }
    });
    res.render('admin/news/edit.html', {
        csrfToken: req.csrfToken(),
        news
    });
};
exports.get_news_detail = async (req, res) => {
    try {
        const news = await models.News.findOne({
            where: {
                id: req.params.id
            }
        });
        res.render('admin/news/detail.html', {
            news
        });
    } catch (e) {
        console.log(e);
    }
};
exports.post_news_edit = async (req, res) => {
    try {
        await models.News.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.redirect(`/conaservice/news/detail/${req.params.id}`);
    } catch (e) {
        console.log(e);
    }
};
exports.get_news_delete = async (req, res) => {
    try {
        await models.News.destroy({
            where: {
                id: req.params.id
            }
        });
        res.redirect('/conaservice/news');
    } catch (e) {
        console.log(e);
    }
};

// 사이트정보
exports.get_siteinfo_write = async (req, res) => {
    res.render('admin/siteinfo/edit.html', {
        csrfToken: req.csrfToken()
    });
};
exports.post_siteinfo_write = async (req, res) => {
    try {
        await models.SiteInfo.create(req.body);
        res.redirect('/conaservice/siteinfo/detail/1');
    } catch (e) {
        console.log(e);
    }
};
exports.get_siteinfo_detail = async (req, res) => {
    try {
        const siteinfo = await models.SiteInfo.findOne({
            where: {
                id: req.params.id
            }
        });
        res.render('admin/siteinfo/detail.html', {
            siteinfo
        });
    } catch (e) {
        console.log(e);
    }
};
exports.get_siteinfo_edit = async (req, res) => {
    const siteinfo = await models.SiteInfo.findOne({
        where: {
            id: req.params.id
        }
    });
    res.render('admin/siteinfo/edit.html', {
        csrfToken: req.csrfToken(),
        siteinfo
    });
};
exports.post_siteinfo_edit = async (req, res) => {
    try {
        await models.SiteInfo.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.redirect(`/conaservice/siteinfo/detail/${req.params.id}`);
    } catch (e) {
        console.log(e);
    }
};

// 오픈배너 이미지 등록
exports.post_openbn_write = async (req, res) => {
    try {
        const items = req.files;

        req.body.attach_cnt = items.length;
        req.body.content = req.body.content.replace(/(?:\r\n|\r|\n)/g, '<br/>');

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
            });
        });
        res.redirect('/support/inquirys');
    } catch (e) {
        console.log(e);
    }
};