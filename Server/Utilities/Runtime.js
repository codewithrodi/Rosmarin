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

const NodeMailer = require('nodemailer');

exports.RuntimeError = class extends Error{
    constructor(Message, StatusCode){
        super(Message);
        this.StatusCode = StatusCode;
        this.Status = `${StatusCode}`.startsWith(4) ? 'Client Error' : 'Server Error';
        this.IsOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
};

exports.FilterObject = (ObjectToOperate, ...Fields) => {
    let FilteredObject = {};
    Object.keys(ObjectToOperate).forEach((Key) => {
        if(Fields.includes(Key)) 
            FilteredObject[Key] = ObjectToOperate[Key];
    });
    return FilteredObject;
};

exports.CatchAsync = (AsyncFunction, Finally = undefined) => (Request, Response, Next) => {
    let ExecuteFinally = true;
    return AsyncFunction(Request, Response, Next)
        .catch(Next)
        .catch(() => (ExecuteFinally = false))
        .finally(() => setTimeout(() => 
            (ExecuteFinally && typeof Finally === 'function') && (Finally(Request)), 100));
};

exports.SendEmail = this.CatchAsync(async (Options) => {
    const Transporter = NodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const MailOptions = {
        from: process.env.SMTP_OPT_FROM,
        to: Options.Email,
        subject: Options.Subject,
        attachments: Options.Attachments,
        text: Options.Message
    };

    await Transporter.sendMail(MailOptions);
});