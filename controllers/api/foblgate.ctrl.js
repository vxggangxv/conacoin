// const models = require('../../database/models');
// const axios = require('axios');
// const request = require('request');
const rp = require('request-promise');
const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config(); //LOAD CONFIG

exports.ticker_order = async (req, res) => {
    let apiKey = process.env.FOBLGATE_PUBLIC_KEY;
    let scretKey = process.env.FOBLGATE_SECRET_KEY;

    var pairName = 'CONA/KRW';

    var formData = {
        apiKey: apiKey,
        pairName: pairName
    };

    var secretHash = crypto.createHash('sha256').update(apiKey + pairName + scretKey).digest('hex');

    var options = {
        method: 'post',
        url: 'https://api2.foblgate.com/api/ticker/orderBook',
        headers: {
            SecretHeader: secretHash
        },
        form: formData
    };

    let result = [];
    let prev_price = 0;
    let price = 0;
    let status = null;
    rp(options)
        .then((response) => {
            // console.log(typeof response);
            result = JSON.parse(response);
            // console.log('res: ' + result);
            price = parseInt(result.data.buyList[0].price);
            prev_price = parseInt(result.data.buyList[1].price);
            status = true;
            res.json({
                prev_price,
                price,
                status
            });
        })
        .catch(err => {
            console.log('err: ' + err);
            status = false;
            res.json({
                status
            });
        });
};
exports.ticker_public = async (req, res) => {
    let apiKey = process.env.FOBLGATE_PUBLIC_KEY;
    let scretKey = process.env.FOBLGATE_SECRET_KEY;

    var pairName = 'CONA/KRW';

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
            let prev_price = result.data[result.data.length - 2];
            let price = result.data[result.data.length - 1];
            // console.log(price);
            res.json({
                prev_price,
                price
            });
        }
    });
};

exports.account_balance = async (req, res) => {
    let apiKey = process.env.FOBLGATE_PUBLIC_KEY;
    let scretKey = process.env.FOBLGATE_SECRET_KEY;

    let mbId = 'hyunshua@naver.com';

    let formData = {
        apiKey: apiKey,
        mbId: mbId
    };

    let secretHash = crypto
        .createHash('sha256')
        .update(apiKey + mbId + scretKey)
        .digest('hex');

    var options = {
        url: 'https://api2.foblgate.com/api/ticker/publicSign',
        headers: {
            SecretHeader: secretHash
        },
        form: formData
    };

    let result = [];

    request.post(options, function (error, response, body) {
        if (error) {
            console.error('error: ' + error);
        } else {
            result = JSON.parse(body);
            res.json(result);
        }
    });
};