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
const Langs = require('langs');
const Validation = global.Validations.Metrics;

const MetricSchema = new Mongoose.Schema({
    IPv4: {
        type: String,
        maxlength: [Validation.IPv4.MaxLength, 'METRIC_IPV4_MAXLENGTH'],
        required: [true, 'METRIC_IPV4_NOT_PROVIDED']
    },
    Language: {
        type: String,
        lowercase: true,
        maxlength: [Validation.Language.MaxLength, 'METRIC_LANGUAGE_MAXLENGTH'],
        minlength: [Validation.Language.MinLength, 'METRIC_LANGUAGE_MINLENGTH'],
        validate: {
            validator: function(Value){
                return Langs.codes(1).includes(Value);
            },
            message: 'METRIC_LANGUAGE_INVALID'
        },
        required: [true, 'METRIC_LANGUAGE_NOT_PROVIDED']
    },
    OperatingSystem: {
        type: String,
        lowercase: true,
        maxlength: [Validation.OperatingSystem.MaxLength, 'METRIC_OPERATING_SYSTEM_MAXLENGTH'],
        required: [true, 'METRIC_OPERATING_SYSTEM_NOT_PROVIDED']
    },
    Browser: {
        type: String,
        lowercase: true,
        maxlength: [Validation.Browser.MaxLength, 'METRIC_BROWSER_MAXLENGTH'],
        required: [true, 'METRIC_BROWSER_NOT_PROVIDED']
    },
    Country: {
        type: String,
        lowercase: true,
        maxlength: [Validation.Country.MaxLength, 'METRIC_COUNTRY_MAXLENGTH'],
        default: 'Unknown'
    },
    Region: {
        type: String,
        lowercase: true,
        maxlength: [Validation.Region.MaxLength, 'METRIC_REGION_MAXLENGTH'],
        default: 'Unknown'
    },
    City: {
        type: String,
        lowercase: true,
        maxlength: [Validation.City.MaxLength, 'METRIC_CITY_MAXLENGTH'],
        default: 'Unknown'
    },
    Timezone: {
        type: String,
        lowercase: true,
        maxlength: [Validation.Timezone.MaxLength, 'METRIC_TIMEZONE_MAXLENGTH'],
        validate: [(TimeZone) => {
            if(!Intl || !Intl.DateTimeFormat().resolvedOptions().timeZone)
                throw new Error('Time zones are not available in this environment.');
            try{
                Intl.DateTimeFormat(undefined, { timeZone: TimeZone });
                return true;
            }catch(RuntimeError){
                return false;
            }
        }, 'INVALID_TIMEZONE_RECEIVED'],
        default: 'Unknown'
    },
    Latitude: {
        type: String,
        maxlength: [Validation.Latitude.MaxLength, 'METRIC_LATITUDE_MAXLENGTH'],
        default: 'Unknown'
    },
    Longitude: {
        type: String,
        maxlength: [Validation.Longitude.MaxLength, 'METRIC_LONGITUDE_MAXLENGTH'],
        default: 'Unknown'
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});

const Metric = Mongoose.model('Metric', MetricSchema);

module.exports = Metric;