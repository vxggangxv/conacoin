const dotenv = require('dotenv');
dotenv.config(); // LOAD CONFIG

// css 적용된 이메일 내용을 보낼때 받는 inline css로 적어줘야함
module.exports = (content) => (`
    <div style="font-size: 14px; color: #141414; font-family: sans-serif;">
        <p>안녕하세요. 코나코인입니다.</p>
        <p style="margin-top: 20px;">${content}</p>
        <p style="margin-top: 20px;">
            더 궁굼한 사항이 있으시면
            <a href="http://conacoin.io/support/inquirys" target="_blank" rel="noopener noreferrer">[코나코인 - 실시간문의]</a>
            혹은 메일로 문의주시기 바랍니다.
        </p>
        <p style="margin-top: 20px;">감사합니다.</p>
    </div>
`);