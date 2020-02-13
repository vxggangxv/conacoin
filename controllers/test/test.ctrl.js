const model = require('../../database/models')

exports.index = (req, res) => {
    // res.redirect('/crawling');
    res.render('test/crawling.html')
}
exports.get_crawling = (req, res) => {
    const client = require('cheerio-httpcli')

    let url = 'https://hanswsw.tistory.com/';
    var params = {};
    let item = {};
    let content = '';
    let $articleList = '';

    client.fetch(url, params, function (err, $, res) {
        if (err) {
            console.log(err);
            return;
        }
        console.log($('#main .title_post').eq(0).text());
        content = $('#main .title_post').eq(0).text();
        // $('#main .title_post').each(function (post) {
        //     // console.log(post);
        //     console.log($(this).text());
        // })
        // content = $articleList.eq(0).text();
        // console.log(content);
        // console.log(typeof content);
        // console.log($articleList.length);
    })
    let hi = 'hi'

    res.json(content)
    // res.render('test/crawling.html', {
    //     content,
    //     hi
    // });
}