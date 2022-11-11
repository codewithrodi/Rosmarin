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

import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';
import { SetTitle } from '../../../Utilities/Runtime';
 
const NotFoundPage = () => {
    const Navigate = useNavigate();

    useEffect(() => {
        SetTitle('Página no encontrada');
    }, []);

    return (
        <main id='NotFound-Main'>
            <section className='Boo-Wrapper'>
                <article className='Boo'>
                    <div className='Face'></div>
                </article>

                <article className='Shadow'></article>

                <h1>¡Don Bosco no está por aquí!</h1>
                <p>
                    La página que solicitó no existe, verifique la URL e intente nuevamente o más tarde.
                </p>
                <Button 
                    onClick={() => Navigate('/')}
                    variant='outlined'>Ir al inicio</Button>
            </section>
        </main>
    );
};

export default NotFoundPage;