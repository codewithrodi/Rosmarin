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
const Helmet = require('helmet');
const MongoSanitize = require('express-mongo-sanitize');
const XSS = require('xss-clean');
const HPP = require('hpp');
const Cors = require('cors');
const Mongoose = require('mongoose');
const DotEnv = require('dotenv')
const Https = require('https');
const Http = require('http');
const FileSystem = require('fs');

console.clear();

DotEnv.config({ path: './Settings.env' });

global.Validations = Object.assign({}, JSON.parse(FileSystem.readFileSync('./Validations.json')));
global.Configuration = Object.assign({}, JSON.parse(FileSystem.readFileSync('./Configuration.json')));

process.on('uncaughtException', (ServerError) => {
    console.error(ServerError.name, ServerError.message);
    process.exit(1);
});

const GlobalErrorHandler = require('./Controllers/Error');
const Application = Express();
const Database = process.env.DATABASE_HOST.replace('<password>', process.env.DATABASE_PASSWORD);
const Port = process.env.SERVER_PORT || 7300;
const Hostname = process.env.SERVER_HOST || '0.0.0.0';

Application.disable('x-powered-by');
Application.use(Cors({ origin: process.env.CORS_ORIGIN }));
Application.use(HPP());
Application.use(XSS());
Application.use(Helmet());
Application.use(MongoSanitize());
Application.use(Express.json({ limit: process.env.BODY_MAX_SIZE || '10kb' }));
Application.use('/api/v1/auth', require('./Routes/Authentication'));
Application.use('/api/v1', require('./Routes/Barebones'));
Application.use('/api/v1/metric', require('./Routes/Metric'));
Application.all('*', (Request, Response, Next) => 
    Response.status(404).json({
        Message: `Can't find ${Request.originalUrl} on the server.`
    }));
Application.use(GlobalErrorHandler);

Http.globalAgent.maxSockets = Https.globalAgent.maxSockets = Infinity;

var WebServer = Http.createServer;
var WebServerConfiguration = {};

if(process.env.SSL_CERT?.length && process.env.SSL_KEY?.length){
    WebServer = Https.createServer;
    WebServerConfiguration = {
        key: FileSystem.readFileSync(process.env.SSL_KEY),
        cert: FileSystem.readFileSync(process.env.SSL_CERT)
    };
}

WebServer = WebServer(WebServerConfiguration, Application);

WebServer.listen(Port, Hostname, () => {
    Mongoose.connect(Database, { useNewUrlParser: true })
        .then(() => console.log('Connected to the Mongo Database.'))
        .catch((ConnectionError) => 
            console.error('An error has been ocurred in the MongoDB connection.\n', ConnectionError));
    console.log(`The server was started successfully in the network address (${Hostname}:${Port}).`);
});

process.on('unhandledRejection', () => {
    console.warn(ServerError.name, ServerError.message);
    WebServer.close(() => process.exit(1));
});