//이미지 저장되는 위치 설정
const path = require('path');

module.exports = (uploadPath, uploadName) => {
    if (!uploadPath) {
        uploadPath = '';
    }

    const uploadDir = path.join(__dirname, `../../uploads/${uploadPath}`); // 루트의 uploads위치에 저장한다.

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

            let settingName = '';

            if (!uploadPath || uploadName == 'basename') {
                settingName = `${basename}` + '-' + Date.now() + extension;
            }
            if (!uploadName) {
                if (uploadPath) {
                    settingName = `${uploadPath}` + '-' + Date.now() + extension;
                }
                if (uploadName) {
                    settingName = `${uploadName}` + '-' + Date.now() + extension;
                }
            }
            callback(
                null,
                settingName
            );
        }
    });

    return multer({
        storage: storage,
        limits: {
            fileSize: 10 * 1024 * 1024
        }
    });
};