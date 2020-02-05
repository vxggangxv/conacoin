const models = require('../database/models');

module.exports = async () => {
    try {
        // 임시 문의 글
        await models.Inquirys.bulkCreate([{
                name: "농어",
                email: "nongeo@test.com",
                title: "제목1",
                content: "내용1",
            },
            {
                name: "농어",
                email: "nongeo@test.com",
                title: "제목2",
                content: "내용1",
            }, {
                name: "농어",
                email: "nongeo@test.com",
                title: "제목1",
                content: "내용1",
            }, {
                name: "농어",
                email: "nongeo@test.com",
                title: "제목1",
                content: "내용1",
            }, {
                name: "농어",
                email: "nongeo@test.com",
                title: "제목1",
                content: "내용1",
            }, {
                name: "농어",
                email: "nongeo@test.com",
                title: "제목1",
                content: "내용1",
            }, {
                name: "농어",
                email: "nongeo@test.com",
                title: "제목1",
                content: "내용1",
            }, {
                name: "농어",
                email: "nongeo@test.com",
                title: "제목1",
                content: "내용1",
            }, {
                name: "농어",
                email: "nongeo@test.com",
                title: "제목1",
                content: "내용1",
            }, {
                name: "농어",
                email: "nongeo@test.com",
                title: "제목1",
                content: "내용1",
            }, {
                name: "농어",
                email: "nongeo@test.com",
                title: "제목1",
                content: "내용1",
            }, {
                name: "농어",
                email: "nongeo@test.com",
                title: "제목1",
                content: "내용1",
            }
        ]);

        // 임시 문의 글 답변
        await models.InquirysReply.bulkCreate([{
            content: "첫번째 메모1",
            inquiry_id: 1
        }]);


    } catch (err) {
        // throw(err);
    }
};