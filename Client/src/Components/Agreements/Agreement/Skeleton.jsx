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

import React, { useEffect, useRef } from 'react';
import { Skeleton } from '@mui/material';
import './Agreement.css';

const AgreementSkeleton = ({ IsImageLoading = false }) => {
    const TitleReference = useRef(null);
    const OptionsReference = useRef(null);

    useEffect(() => {
        if(OptionsReference.current)
            OptionsReference.current.style.height = TitleReference.current.clientHeight + 'px';
    }, []);

    const ImageSkeleton = <Skeleton animation='wave' variant='rectangular' height={250} />;

    return (IsImageLoading) ? (ImageSkeleton) : (
        <figure className='Agreement-Container'>
            {ImageSkeleton}
            <figcaption>
                <div className='Title-Container' ref={TitleReference}>
                    <Skeleton animation='wave' variant='rectangular' height={20} />
                    <Skeleton animation='wave' variant='rectangular' height={50} />
                </div>
                <div ref={OptionsReference} className='Options-Container'>
                    <Skeleton animation='wave' variant='circular' width={20} height={20} />
                    <Skeleton animation='wave' variant='circular' width={20} height={20} />
                </div>
            </figcaption>
        </figure>
    );
};

export default AgreementSkeleton;