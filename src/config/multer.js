const multer = require('multer');
const path = require('path');

const multerConfig = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'tmp'),
        filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }  
    })
}

module.exports = multerConfig;