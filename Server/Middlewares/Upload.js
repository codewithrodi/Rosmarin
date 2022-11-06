/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * For related information - https://github.com/CodeWithRodi/Rosmarin/
 *
 * Source code for Rosmarin, an open source platform designed for the general 
 * student center of the Salesian Institution in Talca, Chile.
 * 
 * (www.cgacest.com)
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 ****/

const Multer = require('multer');
const FileSystem = require('fs');
const Security = require('../Utilities/Security');

exports.Upload = Multer({
    storage: Multer.diskStorage({
        destination: (Request, File, Callback) => {
            FileSystem.mkdirSync(process.env.IMAGES_FOLDER_PATH, { recursive: true });
            Callback(null, process.env.IMAGES_FOLDER_PATH);
        },
        filename: (Request, File, Callback) => Callback(null, Date.now() + '-' + File.originalname)
    }),
    fileFilter: (Request, File, Callback) => Callback(null, Security.AcceptedImagesMimeTypes.includes(File.mimetype))
});

module.exports = exports;