const models = require('../../database/models');
const dotenv = require('dotenv');
dotenv.config(); // LOAD CONFIG

exports.get_join = (req, res) => {
    res.render('admin/join.html', {
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
            location.href="/admin/join";</script>');
            return;
        }
        if (!user) {
            await models.User.create({
                username: username,
                password: password
            })
            res.send('<script>alert("가입 성공");\
            location.href="/admin/login";</script>');
        }
    } catch (e) {
        console.log(e);
    }
    // res.send('<script>alert("가입 성공");\
    // location.href="/admin/join";</script>');
}
exports.get_login = (req, res) => {
    res.render('admin/login.html', {
        flashMessage: req.flash().error,
        csrfToken: req.csrfToken()
    });
}
exports.post_login = async (req, res) => {
    res.send('<script>alert("로그인 성공");\
    location.href="/admin";</script>');
}
exports.index = (req, res) => {
    res.render('admin/users/list.html', {});
}
exports.logout = (req, res) => {
    req.logout();
    res.redirect('admin/login');
};
exports.get_password = (req, res) => {
    res.render('admin/password.html', {
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
        //     location.href="/admin/password";</script>');
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
        location.href="/admin/password";</script>');
    } catch (e) {
        console.log(e);
    }
}

// exports.get_detail = async (req, res) => {
//     try {
//         const inquiry = await models.inquirys.findOne({});
//     } catch (e) {

//     }
// }