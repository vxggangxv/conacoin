const models = require('../../database/models');

module.exports = async () => {
    try {
        // 임시 문의 글
        await models.News.bulkCreate([{
                name: '농어',
                date: '20.02.09',
                title: '2개월 서 공개 앞둔 코나코인',
                link: 'https://naver.com'
            },
            {
                name: '농어',
                date: '20.02.09',
                title: '2개월 서 공개 앞둔 코나코인',
                link: 'https://naver.com'
            },
            {
                name: '농어',
                date: '20.02.09',
                title: '2개월 서 공개 앞둔 코나코인',
                link: 'https://naver.com'
            },
            {
                name: '농어',
                date: '20.02.09',
                title: '2개월 서 공개 앞둔 코나코인',
                link: 'https://naver.com'
            },
            {
                name: '농어',
                date: '20.02.09',
                title: '2개월 서 공개 앞둔 코나코인',
                link: 'https://naver.com'
            },
            {
                name: '농어',
                date: '20.02.09',
                title: '2개월 서 공개 앞둔 코나코인',
                link: 'https://naver.com'
            },
            {
                name: '농어',
                date: '20.02.09',
                title: '2개월 서 공개 앞둔 코나코인',
                link: 'https://naver.com'
            },
            {
                name: '농어',
                date: '20.02.09',
                title: '2개월 서 공개 앞둔 코나코인',
                link: 'https://naver.com'
            },
            {
                name: '농어',
                date: '20.02.09',
                title: '2개월 서 공개 앞둔 코나코인',
                link: 'https://naver.com'
            },
            {
                name: '농어',
                date: '20.02.09',
                title: '2개월 서 공개 앞둔 코나코인',
                link: 'https://naver.com'
            },
            {
                name: '농어',
                date: '20.02.09',
                title: '2개월 서 공개 앞둔 코나코인',
                link: 'https://naver.com'
            },
            {
                name: '농어',
                date: '20.02.09',
                title: '2개월 서 공개 앞둔 코나코인',
                link: 'https://naver.com'
            },
            {
                name: '농어',
                date: '20.02.09',
                title: '2개월 서 공개 앞둔 코나코인',
                link: 'https://naver.com'
            },
            {
                name: '농어',
                date: '20.02.09',
                title: '2개월 서 공개 앞둔 코나코인',
                link: 'https://naver.com'
            }
        ]);


    } catch (err) {
        // throw(err);
    }
};