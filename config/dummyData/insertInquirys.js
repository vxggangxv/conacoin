const models = require('../../database/models');

module.exports = async () => {
    // function dummyData(number) {
    //     return [...Array(number).keys()].map(i => ({
    //         x: `07-${i < 9 ? '0' + (i + 1) : i + 1}`,
    //         y: parseInt(Math.random() * 300),
    //     }));
    // }
    const data = [...Array(150).keys()].map(i => ({
        name: '농어',
        password: '1111',
        email: 'nongeo@test.com',
        title: `제목-${i}`,
        content: `내용-${i}`
    }));
    try {
        // 임시 문의 글
        await models.Inquirys.bulkCreate([{
                name: '농어',
                password: '1111',
                email: 'nongeo@test.com',
                title: '제목1',
                content: '내용1',
                reply_cnt: '1'
            },
            ...data
        ]);

        // 임시 문의 글 답변
        await models.InquirysReply.bulkCreate([{
            name: 'master',
            content: '첫번째 메모1',
            inquiry_id: 1
        }]);


    } catch (err) {
        // throw(err);
    }
};