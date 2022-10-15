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

import { useLayoutEffect, useState } from 'react';

const UseWindowSize = () => {
    const [GetSize, SetSize] = useState([window.innerWidth, window.innerHeight]);
    
    useLayoutEffect(() => {
        const UpdateSize = () => SetSize([
            window.innerWidth, window.innerHeight]);
        window.addEventListener('resize', UpdateSize);
        UpdateSize();
        return () => {
            window.removeEventListener('resize', UpdateSize);
        };
    }, []);
    
    return GetSize;
};

export default UseWindowSize;