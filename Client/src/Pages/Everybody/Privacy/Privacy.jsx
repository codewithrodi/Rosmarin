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
                    Description: 'Infórmate de nuestras condiciones de uso y política de privacidad, conoce quiénes somos realmente y qué hacemos con tus datos.'
                }}
                ComplementBox={{
                    Title: '¿Sabes realmente de qué se trata esto?',
                    Description: 'La política de privacidad, es un documento o ciertas declaraciones hechas por un sitio web, donde se plasman las prácticas y procesos adoptados dentro de una página para darle al usuario toda la transparencia en relación con los datos que usa.'
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
                        <p>Los responsables detrás del dominio (www.cgacest.com) junto con esta plataforma y/o derivados, es un grupo de 23 integrantes, aspirantes al centro general de estudiantes del año 2023, actualmente, mantenemos esta plataforma, con el fin para mejorarla en todos sus ámbitos, destacando la experiencia que podemos ofrecer al usuario, con el objetivo de poder adaptarlas a todas nuestras propuestas que tenemos como lista, nos comprometemos a mantener esta plataforma y generar más soluciones para nuestros estudiantes siempre y cuando salgamos como lista ganadora, somos altamente transparentes, para dar visibilidad de cómo haremos cada uno de nuestros proyectos, los cuales beneficiarán única y exclusivamente a los estudiantes de la presencia salesiana en Talca. Dando así, una estancia por parte del centro de estudiantes nunca antes vista, estamos aquí totalmente decididos, con ganas de reinventar la rueda, de cambiar lo establecido, y de contribuir positivamente en todo lo que esté a nuestro alcance.</p>
                    </div>

                    <div>
                        <h3>Hablemos de tu información</h3>
                        <p>
                            En el momento en que ingresa a nuestra plataforma, capturamos varios datos que tiene su cliente, que en este caso es información pública que su navegador de Internet como (Chrome, Safari, Opera...) nos proporciona. Esto lo hacemos con el fin de poder conocer en detalle quiénes son nuestros visitantes y desde dónde se conectan, así como disponer de distintas métricas que nos indiquen las visitas que ha obtenido la web tanto por IP únicas como duplicadas.
                            Tu información NO se comparte de ninguna manera, y nuestro servidor se encuentra estrictamente bajo diversos protocolos de seguridad contra posibles hackeos, tu información solo se almacena en nuestra base de datos para poder obtener métricas a través de ellos.
                            Queremos ser lo más transparentes posible sobre todo lo que podemos hacer. ¿Qué capturamos exactamente de su navegador web? Cuando ingresa a nuestro sitio, se capturan automáticamente su dirección IP, el idioma de su navegador, su sistema operativo, su navegador o cliente, su país, región, ciudad, latitud y longitud según lo indicado por su dirección IP y su zona horaria.
                        </p>
                    </div>

                    <div>
                        <h3>Estabilidad y viabilidad</h3>
                        <p>Buscamos reducir al máximo cualquier costo posible, sin perder la increíble experiencia de usuario que podemos asignar a nuestros visitantes, esta plataforma web está siendo mantenida por una de las listas de aspirantes al centro de estudiantes del año 2023, lista, la cual contiene miembros pertenecientes al centro de estudiantes actual, nuestra plataforma está en constante cambio, con el fin de poder generar algo robusto, de manera que podamos desarrollar diversas de nuestras propuestas que poseemos, con el fin de garantizar una excelente estadía a nuestros estudiantes, una estadia y/o experiencia nunca antes vista, elaborada por un centro de estudiantes, donde facilitamos atajos digitales que benefician directamente a nuestros alumnos.</p>
                    </div>
                </article>
            </section>
        </main>
    );
};

export default PrivacyPage;