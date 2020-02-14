const models = require('../../database/models')
const request = require('request')
const axios = require('axios')
const crypto = require('crypto')
const dotenv = require('dotenv')

dotenv.config() //LOAD CONFIG

exports.ticker_order = async (req, res) => {
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
        prev_price = parseInt(result.data.buyList[0].price)
        price = parseInt(result.data.buyList[1].price)
        res.json({
            prev_price,
            price
        });
    });
}
exports.ticker_public = async (req, res) => {
    let apiKey = process.env.FOBLGATE_PUBLIC_KEY
    let scretKey = process.env.FOBLGATE_SECRET_KEY

    var pairName = "CONA/KRW";

    var formData = {
        apiKey: apiKey,
        pairName: pairName
    };

    var secretHash = crypto.createHash('sha256').update(apiKey + pairName + scretKey).digest('hex');

    var options = {
        url: 'https://api2.foblgate.com/api/ticker/publicSign',
        headers: {
            SecretHeader: secretHash
        },
        form: formData
    };

    request.post(options, function (error, response, body) {
        if (error) {
            console.error(error);
        } else {
            let result = JSON.parse(body);
            let prev_price = result.data[result.data.length - 2]
            let price = result.data[result.data.length - 1]
            // console.log(price);
            res.json({
                prev_price,
                price
            })
        }
    });
}

exports.account_balance = async (req, res) => {
    let apiKey = process.env.FOBLGATE_PUBLIC_KEY
    let scretKey = process.env.FOBLGATE_SECRET_KEY

    let mbId = 'hyunshua@naver.com'

    let formData = {
        apiKey: apiKey,
        mbId: mbId,
    }

    let secretHash = crypto
        .createHash('sha256')
        .update(apiKey + mbId + scretKey)
        .digest('hex')

    var options = {
        url: 'https://api2.foblgate.com/api/ticker/publicSign',
        headers: {
            SecretHeader: secretHash
        },
        form: formData
    };

    let result = []

    request.post(options, function (error, response, body) {
        if (error) {
            console.error('error: ' + error)
        } else {
            result = JSON.parse(body);
            res.json(result)
        }
    })
}