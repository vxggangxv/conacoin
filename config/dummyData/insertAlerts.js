const models = require('../../database/models');

module.exports = async () => {
    try {
        // 임시 문의 글
        await models.Alerts.bulkCreate([{
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목1',
                content: '내용1',
                reply_cnt: '1'
            },
            {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목2',
                content: '내용2'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목3',
                content: '내용3'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목4',
                content: '내용4'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목5',
                content: '내용5'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목6',
                content: '내용6'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목7',
                content: '내용7'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목8',
                content: '내용8'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목9',
                content: '내용9'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목10',
                content: '내용10'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목11',
                content: '내용11'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목12',
                content: '내용12'
            },
            {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목2',
                content: '내용2'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목3',
                content: '내용3'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목4',
                content: '내용4'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목5',
                content: '내용5'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목6',
                content: '내용6'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목7',
                content: '내용7'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목8',
                content: '내용8'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목9',
                content: '내용9'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목10',
                content: '내용10'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목11',
                content: '내용11'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목12',
                content: '내용12'
            },
            {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목2',
                content: '내용2'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목3',
                content: '내용3'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목4',
                content: '내용4'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목5',
                content: '내용5'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목6',
                content: '내용6'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목7',
                content: '내용7'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목8',
                content: '내용8'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목9',
                content: '내용9'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목10',
                content: '내용10'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목11',
                content: '내용11'
            }, {
                name: '방어',
                email: 'nongeo@test.com',
                title: '제목12',
                content: '내용12'
            }
        ]);


    } catch (err) {
        // throw(err);
    }
};