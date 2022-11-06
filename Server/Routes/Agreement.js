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

const Express = require('express');
const Router = Express.Router();
const AgreementController = require('../Controllers/Agreement');
const UploadMiddleware = require('../Middlewares/Upload');
const AuthMiddleware = require('../Middlewares/Authentication');

Router.get('/', AgreementController.GetAgreements);

Router.use(AuthMiddleware.Protect, AuthMiddleware.RestrictTo('admin'));

Router.post('/', UploadMiddleware.Upload.single('Photo'), AgreementController.CreateAgreement);

Router.route('/:Identifier/')
    .delete(AgreementController.DeleteAgreement)
    .patch(UploadMiddleware.Upload.single('Photo'), AgreementController.UpdateAgreement);

Router.route('/:Slug/')
    .get(AgreementController.GetAgreement);

module.exports = Router;