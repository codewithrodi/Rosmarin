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

const HandlerFactory = require('./HandlerFactory');
const Agreement = require('../Models/Agreement');

const FilterRequestFields = ['Title', 'Description', 'GoogleMapsURL', 'WhatsappPhoneNumber', 'Instagram', 'Facebook'];

exports.CreateAgreement = HandlerFactory.CreateOne({
    Model: Agreement,
    FilterRequestFields,
    ApplyFilter: (Request) => ({
        Photo: (Request.file?.filename) ? (Request.file.filename) : (undefined)
    })
});

exports.GetAgreement = HandlerFactory.GetOne({
    Model: Agreement,
    Method: 'findOne',
    ApplyFilter: (Request) => ({ Slug: Request.params.Slug })
});

exports.GetAgreements = HandlerFactory.GetAll({
    Model: Agreement
});

exports.DeleteAgreement = HandlerFactory.DeleteOne({
    Model: Agreement,
});

exports.UpdateAgreement = HandlerFactory.UpdateOne({
    Model: Agreement,
    FilterRequestFields,
    AdditionalFields: (Request) => (Request.file?.filename) && ({
        Photo: Request.file.filename
    })
});