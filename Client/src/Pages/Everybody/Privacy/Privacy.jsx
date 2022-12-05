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
import HeadShake from 'react-reveal/HeadShake';
import ColorsBox from '../../../Components/General/ColorsBox';
import { SetTitle } from '../../../Utilities/Runtime';
import './Privacy.css';

const PrivacyPage = () => {
    useEffect(() => {
        SetTitle('Términos de Uso y Política de Privacidad');
    }, []);

    return (
        <main id='Privacy-Main'>
            <ColorsBox
                InfoBox={{
                    Title: '¡Porque el conocimiento es un verdadero poder!',
                    Description: 'Conoce al pie de la letra cada uno de los términos y condiciones que aceptas al momento de que navegas a través de nuestra plataforma Y resuelve incógnitas como él ¿Qué hacemos con tus datos?, ¿Quiénes están detrás de esta plataforma?, entre otras...'
                }}
                ComplementBox={{
                    Title: '¿Sabes realmente de qué se trata esto?',
                    Description: 'La política de privacidad, es un documento o ciertas declaraciones hechas por un sitio web, donde se plasman las prácticas y procesos adoptados dentro de una página para darle al usuario toda la transparencia en relación con los datos que usa la misma para llevar a cabo diversas acciones.'
                }}
            />

            <section>
                <article id='Header-Box'>
                    <HeadShake>
                        <h3>Términos de Uso y Política de Privacidad</h3>
                    </HeadShake>
                </article>
                
                <article id='Terms-Box'>
                    <div>
                        <h3>¿Quiénes somos exactamente?</h3>
                        <p>Los responsables detrás del dominio (www.cgacest.com) junto con esta plataforma y/o derivados, es un grupo de 23 integrantes, que hacen parte del Centro General de Alumnos de ambas casas que posee la presencia Salesiana en Talca, actualmente, mantenemos esta plataforma, con la finalidad de complementar la estadia del alumnado y los diversos proyectos que llevamos a cabo, destacando la experiencia que podemos ofrecer a nuestros visitantes y unidos con el objetivo de poder adaptarlas a cada una de nuestras propuestas de manera que podamos generar más soluciones para los estudiantes, somos altamente transparentes bajo el lema de nuestra institución, buscando unicamente el beneficio del alumnado que alberga la presencia Salesiana en Talca. Dando así, una estancia por parte del Centro de Alumnos nunca antes vista, estamos aquí totalmente decididos, con ganas de reinventar la rueda, de cambiar lo establecido, y de contribuir positivamente en todo lo que esté a nuestro alcance.</p>
                    </div>

                    <div>
                        <h3>Hablemos de tu información</h3>
                        <p>
                            En el momento en que ingresa a nuestra plataforma, nos encargamos de capturar varios datos que tiene a disposición su cliente, que en este caso es información que su navegador de Internet como (Chrome, Safari, Opera...) nos proporciona. Esto lo hacemos con el fin de poder conocer en detalle quiénes son nuestros visitantes y desde dónde se conectan, así como disponer de distintas métricas que nos indiquen las visitas que ha obtenido la web tanto por direcciones IP únicas como duplicadas.
                            Tu información NO es compartida, nuestro servidor se encuentra estrictamente bajo diversos protocolos de seguridad contra posibles hackeos, tu información solo se almacena en nuestra base de datos para poder obtener y generar métricas a través de ellas.
                            Buscamos ser lo más transparentes posibles en cuanto a las diferentes cosas que hacemos. ¿Qué capturamos exactamente de su navegador web? Cuando ingresa a nuestra plataforma, se capturan de forma instantánea su dirección IP, el idioma de su navegador, su sistema operativo, su navegador o cliente, su país, región, ciudad, latitud y longitud según lo indicado por su dirección IP y su zona horaria.
                        </p>
                    </div>

                    <div>
                        <h3>Estabilidad y viabilidad</h3>
                        <p>Buscamos reducir al máximo cualquier costo posible, sin perder la increíble experiencia de usuario que podemos asignar a nuestros visitantes, esta plataforma web está siendo mantenida por una de las listas de aspirantes al centro de estudiantes del año 2023, lista, la cual contiene miembros pertenecientes al centro de estudiantes actual, nuestra plataforma está en constante cambio, con el fin de poder generar algo robusto, de manera que podamos desarrollar diversas de nuestras propuestas que poseemos, con el fin de garantizar una excelente estadía a nuestros estudiantes, una estadía y/o experiencia nunca antes vista, elaborada por un centro de estudiantes, donde facilitamos atajos digitales que benefician directamente a nuestros alumnos.</p>
                    </div>
                </article>
            </section>
        </main>
    );
};

export default PrivacyPage;
