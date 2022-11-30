const S3 = require("aws-sdk/clients/s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
require('dotenv').config()

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const s3 = new S3({
    region: 'us-east-1',
    accessKeyId: 'AKIAZTVL4J7WV3HB4NPB',
    secretAccessKey: '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',
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'hotelbooking-profile-picture-upload',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const isValid = FILE_TYPE_MAP[file.mimetype];
            let uploadError = new Error('invalid image type')

            if (isValid) uploadError = null;
            
            const extension = FILE_TYPE_MAP[file.mimetype];
            const rawName = file.originalname.split(`.${extension}`)[0];
            const fileName = `${rawName}-${Date.now()}.${extension}`
            cb(uploadError, fileName);
        }
    })
});

function s3UploadImg() {
    return upload.array('img', 5)
};

module.exports = {
    s3UploadImg
};