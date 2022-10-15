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
import BoscoImage from '../../../Assets/Images/Home/Bosco-Image.png';
import { Button } from '@mui/material';
import ColorsBox from '../../../Components/General/ColorsBox';
import { SetTitle } from '../../../Utilities/Runtime';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
    const Navigate = useNavigate();

    useEffect(() => {
        SetTitle('Inicio');
    }, []);

    return (
        <main id='Home-Main'>
            <section id='Welcome-Box'>
                <article id='Info-Box'>
                    <h3>Centro General de Alumnos, Salesianos Talca</h3>
                    <p>Descubre y mantente informado de las diferentes novedades que se producen en el establecimiento.</p>
                    <div id='Shortcuts'>
                        <Button 
                            onClick={() => Navigate('/agreements')}
                            variant='contained'>Convenios</Button>
                        <Button
                            onClick={() => Navigate('/contact')}
                            variant='text'>Contacto</Button>
                    </div>
                </article>

                <article id='Image-Box'>
                    <img src={BoscoImage} alt='Bosco Img' />
                </article>
            </section>

            <ColorsBox
                InfoBox={{
                    Title: '¡Una nueva visión para el centro de estudiantes!',
                    Description: 'Para el año 2023 postulan nuevamente integrantes del actual centro de estudiantes, siendo una lista de 23 integrantes con alrededor de dos decenas de propuestas. Una lista que llega para innovar y cambiar lo establecido.'
                }}
                ComplementBox={{
                    Title: '¡Porque serán los representantes del establecimiento!',
                    Description: 'Tu voto vale más de lo que crees, ahora que se acercan las elecciones para el centro de estudiantes 2023, elige tu lista a conciencia, ¡tu futuro está en juego!'
                }}
            />
        </main>
    );
}

export default HomePage;