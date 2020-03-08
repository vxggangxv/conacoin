const dotenv = require('dotenv');
dotenv.config(); // LOAD CONFIG

// css 적용된 이메일 내용을 보낼때 받는 inline css로 적어줘야함
module.exports = (content) => (`
    <div style="font-size: 14px; font-family: sans-serif;">
        <p>안녕하세요. 코나코인입니다.</p>
        <p style="margin-top: 20px;">${content}</p>
        <p style="margin-top: 20px;">
            문의를 원하신다면
            <a href="http://conacoin.io/support/inquirys" target="_blank" rel="noopener noreferrer">http://conacoin.io/support/inquirys</a>로
            문의주시기 바랍니다.
        </p>
        <p style="margin-top: 20px;">갑사합니다.</p>
    </div>
`);