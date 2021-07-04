const multer = require('multer');

// image option

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/svg': 'svg'
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadImageError = new Error('invalid type image');

        if (isValid) {
            uploadImageError = null;
        }

        cb(null, 'public/upload/icon')
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-')
        // const extension = FILE_TYPE_MAP[file.mimetype]
        cb(null, `${fileName}`)
    }
})

const uploadOptions = multer({ storage: storage })

const middlewareCategory = [
    uploadOptions.single('imageIcon')
]



module.exports = middlewareCategory;