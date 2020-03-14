//이미지 저장되는 위치 설정
const path = require('path');
const uploadDir = path.join(__dirname, '../../uploads'); // 루트의 uploads위치에 저장한다.
const fs = require('fs');

//multer 셋팅
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        //이미지가 저장되는 도착지 지정
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        // products-날짜.jpg(png) 저장
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);

        callback(
            null,
            basename + '-' + Date.now() + '.' + file.mimetype.split('/')[1]
        );
    }
});
module.exports = multer({
    storage: storage,
    limits: {
        files: 5,
        fileSize: 5 * 10 * 1024 * 1024
    }
});