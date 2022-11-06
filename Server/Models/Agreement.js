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

const Mongoose = require('mongoose');
const Slugify = require('slugify');
const SocialValidator = require('is-social');
const Security = require('../Utilities/Security');
const FileSystem = require('fs');
const { DeleteFile } = require('../Utilities/Runtime');
const Validations = global.Validations.Agreement;

const AgreementSchema = new Mongoose.Schema({
    Photo: {
        type: String,
        required: [true, 'AGREEMENT_PHOTO_NOT_PROVIDED']
    },
    Title: {
        type: String,
        minlength: [Validations.Title.MinLength, 'AGREEMENT_TITLE_MINLENGTH'],
        maxlength: [Validations.Title.MaxLength, 'AGREEMENT_TITLE_MAXLENGTH'],
        trim: true,
        unique: true,
        required: [true, 'AGREEMENT_TITLE_NOT_PROVIDED']
    },
    Slug: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    Description: {
        type: String,
        minlength: [Validations.Description.MinLength, 'AGREEMENT_DESCRIPTION_MINLENGTH'],
        maxlength: [Validations.Description.MaxLength, 'AGREEMENT_DESCRIPTION_MAXLENGTH'],
        trim: true,
        required: [true, 'AGREEMENT_DESCRIPTION_NOT_PROVIDED']
    },
    GoogleMapsURL: {
        type: String,
        maxlength: [Validations.GoogleMapsURL.MaxLength, 'AGREEMENT_GOOGLE_MAPS_URL_MAXLENGTH'],
        trim: true,
        required: [true, 'AGREEMENT_GOOGLE_MAPS_URL_NOT_PROVIDED']
    },
    WhatsappPhoneNumber: {
        type: String,
        trim: true,
        default: ''
    },
    Instagram: {
        type: String,
        trim: true,
        validator: [SocialValidator.is.instagram.name, 'INSTAGRAM_INVALID_NAME'],
        default: ''
    },
    Facebook: {
        type: String,
        trim: true,
        validator: [SocialValidator.is.facebook.name, 'FACEBOOK_INVALID_NAME'],
        default: ''
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

AgreementSchema.pre('findOneAndDelete', async function(Next){
    const Agreement = this.getQuery()._id;
    Security.AcceptedImagesMimeTypes.forEach((Type) =>
        DeleteFile(`${process.env.IMAGES_FOLDER_PATH}PID-${Agreement}-AC.${Type}`));
    Next();
});

AgreementSchema.methods.ParsePhotoPath = function(OriginalFilename, ID, Bridge){
    const Splitted = OriginalFilename.split('.');
    Bridge.Photo = `PID-${ID}-AC.${Splitted[Splitted.length - 1]}`;
    DeleteFile(process.env.IMAGES_FOLDER_PATH + Bridge.Photo);
    FileSystem.renameSync(process.env.IMAGES_FOLDER_PATH + OriginalFilename, process.env.IMAGES_FOLDER_PATH + Bridge.Photo);
}

AgreementSchema.pre('findOneAndUpdate', async function(Next){
    if(this.getUpdate().Title)
        this.getUpdate().Slug = Slugify(this.getUpdate().Title, { lower: true });
    const OriginalFilename = (this.getUpdate().Photo) ? (`${this.getUpdate().Photo}`) : (false);
    const Document = await this.model.findOne(this.getQuery());
    (OriginalFilename) && (Document.ParsePhotoPath(OriginalFilename, Document._id, this.getUpdate()));
    Next();
});

AgreementSchema.pre('save', function(Next){
    this.Slug = Slugify(this.Title);
    this.ParsePhotoPath(`${this.Photo}`, this._id, this);
    Next();
});

const Agreement = Mongoose.model('Agreement', AgreementSchema);

module.exports = Agreement;