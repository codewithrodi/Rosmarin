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

const { CatchAsync, RuntimeError } = require('../Utilities/Runtime');
const Validator = require('validator');
const GeoIPLite = require('geoip-lite');

const ValidateUserData = (OperatingSystem, Browser, BrowserLanguage) => {
    const Lists = {
        OperatingSystems: [
            'iOS',
            'Android OS',
            'BlackBerry OS',
            'Windows Mobile',
            'Amazon OS',
            'Windows 3.11',
            'Windows 95',
            'Windows 98',
            'Windows 2000',
            'Windows XP',
            'Windows Server 2003',
            'Windows Vista',
            'Windows 7',
            'Windows 8',
            'Windows 8.1',
            'Windows 10',
            'Windows ME',
            'Windows CE',
            'Open BSD',
            'Sun OS',
            'Linux',
            'Mac OS',
            'QNX',
            'BeOS',
            'OS/2',
            'Chrome OS'
        ],
        Browsers: [
            'aol',
            'edge',
            'edge-ios',
            'yandexbrowser',
            'kakaotalk',
            'samsung',
            'silk',
            'miui',
            'beaker',
            'edge-chromium',
            'chrome',
            'chromium-webview',
            'phantomjs',
            'crios',
            'firefox',
            'fxios',
            'opera-mini',
            'opera',
            'pie',
            'netfront',
            'ie',
            'bb10',
            'android',
            'ios',
            'safari',
            'facebook',
            'instagram',
            'ios-webview',
            'curl',
            'searchbot'
        ]
    };
    BrowserLanguage = BrowserLanguage.includes('-')
        ? BrowserLanguage.split('-')[0].toUpperCase()
        : BrowserLanguage.toUpperCase();
    Browser = Lists.Browsers.includes(Browser)
        ? Browser === 'ios'
            ? 'Safari'
            : Browser[0].toUpperCase() + Browser.slice(1)
        : 'Unknown';
    OperatingSystem = Lists.OperatingSystems.includes(OperatingSystem)
        ? OperatingSystem
        : 'Unknown';
    return {
        ValidBrowserLanguage: BrowserLanguage,
        ValidBrowser: Browser,
        ValidOperatingSystem: OperatingSystem
    };
};

const GetGeoInfoFromIP = (IP) => {
    const Data = GeoIPLite.lookup(IP);
    if (!Data)
        return {
            Country: undefined,
            Region: undefined,
            Timezone: undefined,
            City: undefined,
            Latitude: undefined,
            Longitude: undefined
        };
    const [Latitude, Longitude] = Data.ll;
    return {
        Country: Data.country,
        Region: Data.region,
        Timezone: Data.timezone,
        City: Data.city,
        Latitude,
        Longitude
    };
};

exports.ParseRequestData = CatchAsync(async (Request, Response, Next) => {
    const { IPv4, Language, OperatingSystem, Browser } = Request.body;
    if(!IPv4 || !Language || !OperatingSystem || !Browser)
        return Next(new RuntimeError('METRIC_REPORT_NOT_ENOUGH_PARAMETERS'));
    const { Country, Region, Timezone, City, Latitude, Longitude } = GetGeoInfoFromIP(IPv4);
    if(Latitude && Longitude && !Validator.isLatLong(Latitude + ',' + Longitude))
        return Next(new RuntimeError('METRIC_REPORT_LAT_LONG_INVALID'));
    const { ValidBrowser, ValidBrowserLanguage, ValidOperatingSystem } = ValidateUserData(OperatingSystem, Browser, Language);
    Request.MetricData = {
        OperatingSystem: ValidOperatingSystem,
        Browser: ValidBrowser,
        Language: ValidBrowserLanguage,
        IPv4,
        Country,
        Region,
        Timezone,
        City,
        Latitude,
        Longitude
    };
    Next();
});