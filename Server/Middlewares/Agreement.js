const Multer = require('multer');
const FileSystem = require('fs');
const SharpMulter = require('../Utilities/SharpMulter');

exports.UploadAgreementPhoto = Multer({
    storage: SharpMulter({
        Destination: (Request, File, Callback) => {
            FileSystem.mkdirSync(process.env.IMAGES_FOLDER_PATH, { recursive: true });
            // ! Another way of do this...
            Callback(null, process.env.IMAGES_FOLDER_PATH);
        },
        ImageOptions: {
            fileFormat: 'jpeg',
            quality: 100,
            resize: { width: 500, height: 500 }
        }
    })
});

module.exports = exports;