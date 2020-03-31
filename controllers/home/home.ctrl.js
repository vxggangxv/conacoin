const models = require('../../database/models');
// const axios = require('axios');
// const request = require('request');
const rp = require('request-promise');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config(); //LOAD CONFIG

exports.index = async (req, res) => {
    // res.render('index.html')
    res.redirect('/home');
};
exports.get_home = async (req, res) => {
    try {
        const [inquirys, news, alerts, openbanners, partnerbanners] = await Promise.all([
            models.Inquirys.findAll({
                limit: 20,
                offset: 0,
                order: [
                    ['createdAt', 'desc']
                ]
            }),
            models.News.findAll({
                limit: 10,
                offset: 0,
                order: [
                    ['date', 'desc']
                ]
            }),
            models.Alerts.findAll({
                limit: 10,
                offset: 0,
                order: [
                    ['createdAt', 'desc']
                ]
            }),
            models.OpenBanners.findAll(),
            models.PartnerBanners.findAll()
        ]);

        inquirys.forEach(item => {
            item.name = item.name.substr(0, 1) + '****';
        });

        let notices = [];

        news.forEach(item => {
            item.kinds = 'news';
            notices.push(item);
        });
        alerts.forEach(item => {
            item.kinds = 'alerts';
            notices.push(item);
        });

        notices.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });
        // notices.forEach(item => {
        //     console.log(item.title);
        // });

        // let apiKey = process.env.FOBLGATE_PUBLIC_KEY;
        // let scretKey = process.env.FOBLGATE_SECRET_KEY;

        // var pairName = 'CONA/KRW';

        // var formData = {
        //     apiKey: apiKey,
        //     pairName: pairName
        // };

        // var secretHash = crypto.createHash('sha256').update(apiKey + pairName + scretKey).digest('hex');

        // var options = {
        //     method: 'post',
        //     url: 'https://api2.foblgate.com/api/ticker/orderBook',
        //     headers: {
        //         SecretHeader: secretHash
        //     },
        //     form: formData
        // };

        // let result = [];
        // let prev_price = 0;
        // let price = 0;
        // rp(options)
        //     .then((response) => {
        //         // console.log(typeof response);
        //         result = JSON.parse(response);
        //         // console.log(result);
        //         price = parseInt(result.data.buyList[0].price);
        //         prev_price = parseInt(result.data.buyList[1].price);
        //     })
        //     .catch(err => {
        //         console.log(err.message);
        //     })
        //     .finally(() => {
        //         // console.log(result);
        //         res.render('home.html', {
        //             prev_price,
        //             price,
        //             inquirys,
        //             news,
        //             notices,
        //             openbanners,
        //             partnerbanners
        //         });
        //     });

        res.render('home.html', {
            inquirys,
            news,
            notices,
            openbanners,
            partnerbanners
        });
    } catch (e) {
        console.log(e);
    }
};

exports.get_siteinfo = async (req, res) => {
    try {
        const siteinfo = await models.SiteInfo.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json({
            siteinfo
        });
    } catch (e) {
        console.log(e);
    }
};