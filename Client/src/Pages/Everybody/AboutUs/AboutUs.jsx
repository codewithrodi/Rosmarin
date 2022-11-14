import React, { useEffect, useRef, useState } from 'react';
import { SetTitle } from '../../../Utilities/Runtime';
import { Skeleton, Button } from '@mui/material';
import { WorldMap, Grommet } from 'grommet';
import { BsHeart, BsPersonCheck } from 'react-icons/bs';
import { TfiWorld } from 'react-icons/tfi';
import { References } from '../../../Infrastructure/';
import { useNavigate } from 'react-router-dom';
import CollegeImage from '../../../Assets/Images/AboutUs/College-Image.png';
import DocumentationConcept from '../../../Assets/Images/AboutUs/Documentation-Concept.png';
import DiscountConcept from '../../../Assets/Images/AboutUs/Discount-Concept.png';
import SocialMediaConcept from '../../../Assets/Images/AboutUs/Social-Media-Concept.png';
import Accordion from '../../../Components/General/Accordion';
import './AboutUs.css';

const AboutUsPage = () => {
    const Navigate = useNavigate();
    const CollegeImageReference = useRef(null);
    const AccordionBoxReference = useRef(null);
    const [GetIsCollegeImageLoading, SetIsCollegeImageLoading] = useState(true);
    const AccordionsData = [
        ['Dar voz a una comunidad', 'Las personas merecen ser escuchadas y tener voz, incluso cuando eso signifique defender los derechos de las personas con las que no estamos de acuerdo.'],
        ['Trabajando con nosotros', 'Como Centro de Alumnos, aspiramos a construir nuevas formas innovadoras para ayudar a las personas a sentirse más cerca unas de otras, y la composición de nuestros proyectos refleja gradualmente cómo construiremos una comunidad extraordinaria.'],
        ['Ayudar al alumnado y servir a los asistentes', 'Trabajamos para que esta tecnología sea accesible para todos y para que nuestras propuestas a desarrollar beneficien a los estudiantes de manera casi inmediata.'],
        ['Un liderazgo extraordinario', 'Los líderes que aspiran a ser parte del Centro General de Alumnos están guiando la Lista "A" a medida que evoluciona la toma de decisiones, ayudando a crear una comunidad significativamente mejor y unida.']
    ];
    const PurposesData = [
        [<BsHeart />, 'Experiencias', 'Construyendo instancias inolvidables que dejaran una huella en el estudiante.'],
        [<TfiWorld />, 'Universal', 'Sin excluir a nadie, nuestros asombrosos proyectos están destinados hacia todos.'],
        [<BsPersonCheck />, 'Exclusividad', 'Otorgándole múltiples convenios y más de 30 propuestas a desarrollar.']
    ];
    const FeaturesData = [
        [DocumentationConcept, 'Una extensa y completa documentación', <p>No más desconocimiento hacia los estudiantes, <a href=''>tienes un documento con más de 40 páginas</a> que abarca toda nuestra lista, desde nuestros proyectos, convenios, uso del dinero, integrantes, entre otras categorías...</p>, 'Ver documentación', References.Documentation],
        [DiscountConcept, 'Exclusividad únicamente para ti', <p>Nos encargamos de realizar <a href=''>multiples convenios con diversos locales de ambiguo interes</a> para ofrecerte exclusividad al pertenecer al extraordinario alumnado del establecimiento Salesianos de Talca.</p>, 'Conocer convenios', '/agreements'],
        [SocialMediaConcept, 'Redes Sociales en constante actualización', <p>¡No olvides <a href=''>seguirnos en nuestras redes sociales</a> para mantenerte al tanto de todas las noticias que rodean tanto al establecimiento como a nuestra lista, ¿Qué estás esperando para unirte a nuestro movimiento?!</p>, 'Nuestro Instagram', References.Instagram]
    ];

    useEffect(() => {
        SetTitle('Acerca de Nosotros');
        return () => {
            SetIsCollegeImageLoading(false);
        };
    }, []);

    return (
        <main id='AboutUs-Main'>
            <section id='KnowUs-Box'>
                <article id='Our-Mission-Box'>
                    <div>
                        <h2>Nuestra misión</h2>
                        <h3>De transformar el establecimiento en un lugar significativamente mejor</h3>
                        <h2>Facilitando innovadores y asombrosas soluciones creativas <strong>jamás antes vistas</strong> hacia el alumnado...</h2>
                    </div>
                </article>

                <article id='Purposes-Box'>
                    {PurposesData.map(([ Icon, Title, Content ], Index) => (
                        <div key={Index}>
                            <div>
                                {Icon}
                            </div>
                            <div>
                                <h3>{Title}</h3>
                                <p>{Content}</p>
                            </div>
                        </div>
                    ))}
                </article>
            </section>

            <section id='Cutted-Info-Box'>
                <article id='Accordion-Box' ref={AccordionBoxReference}>
                    <div>
                        <h2>Nuestros principios</h2>
                        <p className='Gray-Text'>Representan los valores impartidos por el establecimiento, revelando el notable carisma Salesiano dentro de nuestros miembros...</p>
                    </div>
                    <div>
                        {AccordionsData.map(([ Title, Content ], Index) => (
                            <Accordion
                                key={Index}
                                Title={Title}
                                Content={Content} />
                        ))}
                    </div>
                </article>

                <article>
                    {GetIsCollegeImageLoading && (
                        <Skeleton variant='rectangular' width='100%' height='370px' />
                    )}
                    <img
                        onLoad={() => {
                            SetIsCollegeImageLoading(false);
                            const CIHeight = CollegeImageReference.current.clientHeight + 'px';
                            AccordionBoxReference.current.style.height = CIHeight;
                            AccordionBoxReference.current.style.maxHeight = CIHeight;
                        }}
                        ref={CollegeImageReference} 
                        src={CollegeImage} 
                        alt='Salesianos Talca Ilustración' />
                </article>
            </section>

            <section id='Features-Box'>
                {FeaturesData.map(([ Image, Title, Content, LinkText, Link ], Index) => (
                    <article key={Index}>
                        <div>
                            <img src={Image} alt={Title} />
                        </div>
                        <div>
                            <h3>{Title}</h3>
                            {Content}
                            <Button 
                                variant='contained' 
                                onClick={() => (Link.startsWith('https://') || Link.startsWith('http://')) 
                                                ? (window.location.href = Link) 
                                                : Navigate(Link)}>{LinkText}</Button>
                        </div>
                    </article>
                ))}
            </section>

            <section id='WorldMap-Box'>
                <article>
                    <h3>¡Hola mundo desde <span className='Blue-Highlight'>Talca</span>!</h3>
                    <p className='Gray-Text'>Gracias al desarrollo constante de nuestra plataforma digital y nuestra visibilidad actual dentro de los motores de búsqueda en Internet, ¡Nuestro alcance puede llegar mucho mas allá de nuestra ciudad, cultivando el conocimiento de las acciones que se realizan desde Salesianos Talca a nivel internacional!</p>
                </article>
                
                <Grommet>
                    <WorldMap
                        color='#000000'
                        continents={[
                            {
                                name: 'South America',
                                color: '#0F0FBB',
                            }
                        ]}
                    />
                </Grommet>
            </section>
        </main>
    );
};

export default AboutUsPage;