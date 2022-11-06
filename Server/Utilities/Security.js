exports.AcceptedImagesMimeTypes = [
    'image/jpeg', 
    'image/jpg', 
    'image/png'
];

exports.AcceptedImagesTypes = this.AcceptedImagesMimeTypes.map((MimeType) => MimeType.split('/')[1]);

module.exports = exports;