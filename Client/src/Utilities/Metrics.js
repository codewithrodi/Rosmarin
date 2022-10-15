import { GetClientLanguage } from './Runtime';

export const GetIPv4 = async () => await (await fetch('https://api.ipify.org')).text();

export const GetClientInformation = () => {
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
    let Data = {
        Browser: undefined,
        OperatingSystem: undefined,
        Language: undefined
    };
    const LowerCaseUserAgent = navigator.userAgent.toLowerCase();
    for(let Iterator = 0; Iterator < Lists.Browsers.length; Iterator++)
        if(LowerCaseUserAgent.indexOf(Lists.Browsers[Iterator]) !== -1){
            Data.Browser = Lists.Browsers[Iterator];
            break;
        }
    for(let Iterator = 0; Iterator < Lists.OperatingSystems.length; Iterator++)
        if(navigator.userAgent.indexOf(Lists.OperatingSystems[Iterator]) !== -1){
            Data.OperatingSystem = Lists.OperatingSystems[Iterator];
        }
    Data.Language = GetClientLanguage();
    return Data;
};

export const HandleMetricsDistribution = (Reports, RemoveDuplicates = false) => {
    if(RemoveDuplicates)
        Reports = Reports.filter((Report, Index, Acc) => 
            (Acc.findIndex((Target) => Target.IPv4 ===   Report.IPv4)) === Index);
    Reports = Object.values(Reports);
    const DistributedStatistics = {
        OperatingSystems: {},
        Languages: {},
        Browsers: {},
        Countries: {},
        MonthVisits: {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0
        }
    };
    const RegisterStatistic = (Destinity, ExtractFrom) => {
        const Report = DistributedStatistics[Destinity];
        Reports.forEach((Data) => 
            Report[Data[ExtractFrom]] === undefined
                ? (Report[Data[ExtractFrom]] = 1)
                : (Report[Data[ExtractFrom]] += 1));
    };
    const GetMonth = (Data) => {
        const CreatedAt = new Date(Data.CreatedAt);
        const CurrentDate = new Date(new Date());
        return (CurrentDate.getFullYear() === CreatedAt.getFullYear())
            ? (CreatedAt.getMonth())
            : (null);
    };
    // ! [0, 1] => 0(Destinity) / 1(ExtractFrom)
    [ ['OperatingSystems', 'OperatingSystem'], 
        ['Languages', 'Language'], 
        ['Browsers', 'Browser'], 
        ['Countries', 'Country'] ].forEach(([Destinity, ExtractFrom]) => RegisterStatistic(Destinity, ExtractFrom));
    const Months = Object.keys(DistributedStatistics.MonthVisits);
    Reports.forEach((Data) => {
        const Month = GetMonth(Data);
        if(Month === null)
            return;
        DistributedStatistics.MonthVisits[Months[Month]] += 1;
    });
    return DistributedStatistics;
};