//이미지 저장되는 위치 설정
const path = require('path');
const uploadDir = path.join(__dirname, '../../uploads/inquirys'); // 루트의 uploads위치에 저장한다.

//multer 셋팅
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        //이미지가 저장되는 도착지 지정
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        // inquirys-날짜.확장자 저장
        // 'inquirys-' + new Date().valueOf() + '.' + file.mimetype.split('/')[1],
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(
            null,
            'inquirys-' + Date.now() + extension
        );
    }
});
module.exports = multer({
    storage: storage,
    limits: {
        files: 5,
        fileSize: 5 * 1024 * 1024
    }
});