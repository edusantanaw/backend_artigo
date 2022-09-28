const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
            cb(null, 'public/images/category')
    },
    filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.jpg' || '.png')
    }
});

const upload = multer({ storage: storage }).single('image');
const uploadImages = async (req, res, next) => {
    upload(req, res, function( err) {
        if (err) {
            console.log(err);
        }
        next(undefined, true)
    })
}

module.exports = uploadImages
