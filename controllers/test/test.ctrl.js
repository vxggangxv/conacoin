const model = require('../../database/models')
const axios = require('axios')
const cheerio = require('cheerio')
const request = require('request')
const client = require('cheerio-httpcli')

exports.index = (req, res) => {
    res.send('index')
}
exports.get_crawl = (req, res) => {
    let url = 'https://hanswsw.tistory.com/'
    var params = {}

    client.fetch(url, params, function(err, $, result) {
        if (err) console.log(err)
        // console.log(
        //     $('#main .title_post')
        //     .eq(0)
        //     .text(),
        // );
        res.send(
            $('#main .title_post')
                .eq(0)
                .text(),
        )
        // content = $('#main .title_post').eq(0).text();
        // $('#main .title_post').each(function (post) {
        //     // console.log(post);
        //     console.log($(this).text());
        // })
        // content = $articleList.eq(0).text();
        // console.log(content);
        // console.log(typeof content);
        // console.log($articleList.length);
    })

    // res.send(true)
}
