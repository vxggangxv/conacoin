const models = require('../database/models');

module.exports = async () => {
    try {
        // 임시 문의 글
        await models.Inquirys.bulkCreate([{
                name: "농어",
                password: '1111',
                email: "nongeo@test.com",
                title: "제목1",
                content: "내용1",
            },
            {
                name: "농어",
                password: '1111',
                email: "nongeo@test.com",
                title: "제목2",
                content: "내용2",
            }, {
                name: "농어",
                password: '1111',
                email: "nongeo@test.com",
                title: "제목3",
                content: "내용3",
            }, {
                name: "농어",
                password: '1111',
                email: "nongeo@test.com",
                title: "제목4",
                content: "내용4",
            }, {
                name: "농어",
                password: '1111',
                email: "nongeo@test.com",
                title: "제목5",
                content: "내용5",
            }, {
                name: "농어",
                password: '1111',
                email: "nongeo@test.com",
                title: "제목6",
                content: "내용6",
            }, {
                name: "농어",
                password: '1111',
                email: "nongeo@test.com",
                title: "제목7",
                content: "내용7",
            }, {
                name: "농어",
                password: '1111',
                email: "nongeo@test.com",
                title: "제목8",
                content: "내용8",
            }, {
                name: "농어",
                password: '1111',
                email: "nongeo@test.com",
                title: "제목9",
                content: "내용9",
            }, {
                name: "농어",
                password: '1111',
                email: "nongeo@test.com",
                title: "제목10",
                content: "내용10",
            }, {
                name: "농어",
                password: '1111',
                email: "nongeo@test.com",
                title: "제목11",
                content: "내용11",
            }, {
                name: "농어",
                password: '1111',
                email: "nongeo@test.com",
                title: "제목12",
                content: "내용12",
            }
        ]);

        // 임시 문의 글 답변
        // await models.InquirysReply.bulkCreate([{
        //     content: "첫번째 메모1",
        //     inquiry_id: 1
        // }]);


    } catch (err) {
        // throw(err);
    }
};