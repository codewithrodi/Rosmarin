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

export const MergeObjectValues = (To, From) => {
    for(const Value in From){
        if(typeof To[Value] != 'object')
            To[Value] = From[Value];
        else if(typeof From[Value] === 'object')
            To[Value] = MergeObjectValues(To[Value], From[Value]);
    }
    return To;
};

export const FormatSlug = (Slug) => 
        (Slug.split('').includes('-')) 
        ? ((Slug.split('-').map((Part) => 
            Part.slice(0, 1).toUpperCase() + Part.slice(1)))).join(' ')
        : (Slug.slice(0, 1).toUpperCase() + Slug.slice(1));

export const FormatDuration = (Seconds) => {
    const CurrentDate = new Date(0);
    CurrentDate.setSeconds(Seconds);
    const DateString = CurrentDate.toISOString().slice(11, 19);
    if(Seconds < 3600)
        return DateString.slice(3);
    return DateString;
};

export const ReadableFileSize = (Bytes, SI = false, DP = 1) => {
    const Thresh = SI ? 1000 : 1024;
    if(Math.abs(Bytes) < Thresh)
        return Bytes + ' B';
    const Units = SI ? 
        ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
            :
        ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let Unit = -1;
    const Range = 10 ** DP;
    do{
        Bytes /= Thresh;
        ++Unit;
    }while(Math.round(Math.abs(Bytes) * Range) / Range >= Thresh && Unit < Units.length - 1);
    return Bytes.toFixed(DP) + ' ' + Units[Unit];
}