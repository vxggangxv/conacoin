const request = require('request')
const crypto = require('crypto')
const dotenv = require('dotenv')

dotenv.config() //LOAD CONFIG

module.exports = () => {
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
            console.log(price);
            // res.json({
            //     prev_price,
            //     price
            // })
            return price
        }
    });

}