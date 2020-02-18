const models = require('../../database/models');
const request = require('request')
const crypto = require('crypto')
const dotenv = require('dotenv')

dotenv.config() //LOAD CONFIG

exports.index = async (req, res) => {
    // res.render('index.html')
    res.redirect('/home');
}
exports.get_home = async (req, res) => {
    try {
        const [inquirys, news] = await Promise.all([
            models.Inquirys.findAll({
                limit: 20,
                offset: 0,
                order: [
                    ['createdAt', 'desc']
                ]
            }),
            models.News.findAll({
                limit: 20,
                offset: 0,
                order: [
                    ['date', 'desc']
                ]
            })
        ]);

        inquirys.forEach(item => {
            item.name = item.name.substr(0, 1) + '****';
        });

        let apiKey = process.env.FOBLGATE_PUBLIC_KEY
        let scretKey = process.env.FOBLGATE_SECRET_KEY

        var pairName = "CONA/KRW";

        var formData = {
            apiKey: apiKey,
            pairName: pairName
        };

        var secretHash = crypto.createHash('sha256').update(apiKey + pairName + scretKey).digest('hex');

        var options = {
            url: 'https://api2.foblgate.com/api/ticker/orderBook',
            headers: {
                SecretHeader: secretHash
            },
            form: formData
        };

        let result = [];
        let prev_price = 0;
        let price = 0;
        request.post(options, function (error, response, body) {
            if (error) {
                console.error(error);
            } else {
                // console.log(body);
                result = JSON.parse(body);
            }
            price = parseInt(result.data.buyList[0].price)
            prev_price = parseInt(result.data.buyList[1].price)
            res.render('home.html', {
                prev_price,
                price,
                inquirys,
                news,
            });
        });

        // res.render('home.html', {
        //     inquirys,
        //     news,
        // });
    } catch (e) {
        console.log(e);
    }
}

exports.get_siteinfo = async (req, res) => {
    try {
        const siteinfo = await models.SiteInfo.findOne({
            where: {
                id: req.params.id
            }
        })
        res.json({
            siteinfo
        })
    } catch (e) {
        console.log(e);
    }
}