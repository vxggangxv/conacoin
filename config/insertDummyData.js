const models = require('../models');

module.exports = async () => {
    try {
        //사용자 정보 삽입
        await models.User.create({
            username: 'admin',
            password: '1234',
            status: '이메일인증완료',
            displayname: '관리자',
        });

        await models.User.create({
            username: 'test@naver.com',
            password: '1234',
            status: '이메일인증완료',
            displayname: '노드강사',
        });

        // 임시 제품
        await models.Products.bulkCreate([{
                name: "제품1",
                thumbnail: "../upload/dounut/img_01.png",
                price: 2000,
                description: "데모제품입니다.",
                user_id: 1
            },
            {
                name: "제품2",
                thumbnail: "../upload/dounut/img_02.png",
                price: 1000,
                description: "데모제품입니다.",
                user_id: 1
            }
        ]);

        // TODO 외부키 걸린애들 다량 insert 하는 방법 찾아볼 것
        // 교회 섬네일 추가
        await models.ProductsMemo.bulkCreate([{
            content: "첫번째 메모1",
            product_id: 1
        }, {
            content: "첫번째 메모2",
            product_id: 1
        }]);


    } catch (err) {
        // throw(err);
    }
};