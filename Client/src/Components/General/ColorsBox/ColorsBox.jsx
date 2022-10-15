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

import React from 'react';
import './ColorsBox.css';

const ColorsBox = ({ 
    InfoBox = { 
        Title: '', 
        Description: '' 
    }, 
    ComplementBox = { 
        Title: '', 
        Description: '' 
    } 
}) => (
    <section className='Colors-Box'>
        <article className='Info-Box'>
            <h3>{InfoBox.Title}</h3>
            <p>{InfoBox.Description}</p>
        </article>
        <article className='Complement-Box'>
            <h3>{ComplementBox.Title}</h3>
            <p>{ComplementBox.Description}</p>
        </article>
    </section>
);

export default ColorsBox;