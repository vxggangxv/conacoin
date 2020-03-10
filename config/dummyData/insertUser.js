const models = require('../../database/models');

module.exports = async () => {
    try {
        // 임시 문의 글
        await models.User.create({
            username: 'master',
            password: '1111',
            displayname: '관리자'
        });

    } catch (err) {
        // throw(err);
    }
};