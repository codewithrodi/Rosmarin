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

import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, IconButton } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RiUserVoiceLine, RiTeamLine } from 'react-icons/ri';
import { IoNavigateOutline } from 'react-icons/io5';
import { AiOutlineShop, AiOutlineLink } from 'react-icons/ai';
import { IoIosGitNetwork, IoIosArrowDown } from 'react-icons/io';
import { CgGym } from 'react-icons/cg';
import { Popover, Menu as EverMenu, Position } from 'evergreen-ui';
import { scroller, Element } from 'react-scroll'
import { Document, Page, pdfjs } from 'react-pdf';
import { Settings, References } from '../../../Infrastructure';
import { CopyToClipboard, DownloadExternalFile, SetTitle, EventFire } from '../../../Utilities/Runtime';
import { SiOpslevel } from 'react-icons/si';
import { useAlert } from 'react-alert';
import { VscGithubAlt } from 'react-icons/vsc';
import { BiWorld, BiChurch, BiArrowBack, BiMessageSquare } from 'react-icons/bi';
import { 
    BsCloudFog2, 
    BsThreeDotsVertical,
    BsBarChartLine,
    BsLightning,
    BsShopWindow,
    BsDownload, 
    BsWindow, 
    BsReverseLayoutTextWindowReverse } from 'react-icons/bs';
import TeamWorkConcept from '../../../Assets/Images/Home/Team-Work-Concept.png';
import ColorsBox from '../../../Components/General/ColorsBox';
import UseWindowSize from '../../../Hooks/WindowSize';
import './Home.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const HomePage = () => {
    const Alert = useAlert();
    const Navigate = useNavigate();
    const [Width] = UseWindowSize();
    const [GetRecommendationLetter, SetRecommendationLetter] = useState(null);
    const [SearchParameters] = useSearchParams();
    const Features = [
        [<RiTeamLine />, '+ 20 Integrantes, amplia visión de acontecimientos'],
        [<BiChurch />, 'Representación por igual en ambas sedes, (HC) y (TP)'],
        [<IoIosGitNetwork />, 'Alrededor de dos docenas de proyectos'],
        [<BsCloudFog2 />, 'Un nuevo proceso de digitalización'],
        [<BsBarChartLine />, 'Múltiples presidentes y directivas de cursos, alta carga de liderazgo'],
        [<BsLightning />, 'Producción de alta calidad'],
        [<BiWorld />, 'Fomentando las relaciones exteriores'],
        [<CgGym />, 'Constante foco en actividades recreativas'],
        [<AiOutlineShop />, 'Exclusividad, múltiples convenios firmados'],
        [<SiOpslevel />, 'Integrantes con experiencia dentro del Centro de Alumnos']
    ];
    
    const GetFormattedPDFLink = (Document = GetRecommendationLetter.Document) => `/PDFs/Recommendation-Letters/${Document}`;

    useEffect(() => {
        SetTitle('Inicio');
        switch(SearchParameters.get('Instruction') || ''){
            case 'SeeLettersOfRecommendation':
                scroller.scrollTo('Recommendations-Letters-Box', { 
                    duration: 100, 
                    delay: 0, 
                    offset: (Width < 1000) ? (-350) : (0), 
                    smooth: true 
                });
                break;
            default:
        };
        return () => {
            SetRecommendationLetter(null);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const Nodes = {
            Main: document.getElementById('Home-Main'),
            Header: document.getElementsByTagName('header')[0],
            PDFBox: document.getElementById('Recommendation-Letter-Visualizer-Box')
        };
        if(!Nodes.Main)
            return;
        if(Width < 1000 && GetRecommendationLetter){
            Nodes.Main.style.filter = 'blur(5px) brightness(0.2)';
            Nodes.Header.style.filter = 'blur(5px)';
        }else if((Width > 1000) || GetRecommendationLetter === null){
            [Nodes.Main.style.filter, Nodes.Header.style.filter] = ['', ''];
        }
    }, [GetRecommendationLetter, Width]);

    return (
        <>
            {GetRecommendationLetter && (
                <aside 
                    onClick={(Event) => (!document.getElementById('Actions-Box').contains(Event.target) && !document.querySelector('#PDF-Document-Box  .react-pdf__Page').contains(Event.target)) && (SetRecommendationLetter(null))}
                    id='Recommendation-Letter-Visualizer-Box'
                >
                    <article id='Actions-Box'>
                        <div onClick={() => SetRecommendationLetter(null)}>
                            <IconButton size='small' color='secondary'>
                                <BiArrowBack />
                            </IconButton>
                            <span>{GetRecommendationLetter.Student} - {GetRecommendationLetter.Position} {GetRecommendationLetter.Campus}</span>
                        </div>

                        <div>
                            <div onClick={() => window.open(GetFormattedPDFLink(), '_blank')}>
                                <IconButton  size='small' color='secondary'>
                                    <BsWindow />
                                </IconButton>
                                <span className='Desktop-Box'>Abrir en una nueva pestaña</span>
                            </div>

                            <div
                                onClick={() => {
                                    DownloadExternalFile(GetFormattedPDFLink(), `Carta de recomendación - ${GetRecommendationLetter.Student}.pdf`);
                                    Alert.success();
                                }}
                            >
                                <IconButton color='secondary' size='small'>
                                    <BsDownload />
                                </IconButton>
                                <span className='Desktop-Box'>Descargar</span>
                            </div>

                            <div onClick={() => {
                                CopyToClipboard(window.location.host + GetFormattedPDFLink());
                                Alert.success();
                            }}>
                                <IconButton size='small' color='secondary'>
                                    <AiOutlineLink />
                                </IconButton>
                                <span className='Desktop-Box'>Copiar enlace</span>
                            </div>
                        </div>
                    </article>

                    <article id='PDF-Document-Box'>
                        <Document 
                            loading={
                                <div id='PDF-Rendering-Box'>
                                    <CircularProgress />
                                    <p style={{ color: (Width > 1000) ? ('#FFFFFF') : ('#000000') }}>Tenga paciencia, estamos renderizando el documento para su lectura...</p>
                                </div>
                            }
                            file={GetFormattedPDFLink()}
                        >
                            <Page pageNumber={1} />
                        </Document>
                    </article>
                </aside>
            )}

            <main id='Home-Main' className='Generic-WBox-Main'>
                <section id='Welcome-Box'>
                    <article id='Content-Box'>
                        <div>
                            <h3>¡Somos la Lista A, acompañanos e innovemos juntos!</h3>
                            <p>Una lista conformada por más de 20 integrantes con decenas de propuestas y múltiples convenios. Porque votar informado es importante, ¡Conocenos y vota a consciencia, tu futuro está en tus manos!</p>
                            <div id='Quick-Navegation-Box'>
                                {(Width > 1000) && (
                                    <Button
                                        startIcon={<BiMessageSquare />}
                                        onClick={() => Navigate('/contact')}
                                        variant='contained'
                                    >Contactanos</Button>
                                )}

                                <Popover
                                    position={Position.BOTTOM_RIGHT}
                                    content={
                                        <EverMenu>
                                            <EverMenu.Group>
                                                {(Width < 1000) && (
                                                    <EverMenu.Item
                                                        onClick={() => Navigate('/contact')}
                                                        icon={<RiUserVoiceLine />}
                                                    >
                                                        <span>Contacto</span>
                                                    </EverMenu.Item>
                                                )}
                                                <EverMenu.Item
                                                    onClick={() => Navigate('/agreements')}
                                                    icon={<BsShopWindow />}
                                                >
                                                    <span>Convenios</span>
                                                </EverMenu.Item>
                                            </EverMenu.Group>
                                            <EverMenu.Divider />
                                            <EverMenu.Group>
                                                <EverMenu.Item
                                                    onClick={() => window.location.href = References.Github}
                                                    icon={<VscGithubAlt />}
                                                >
                                                    <span>Codigo fuente</span>
                                                </EverMenu.Item>
                                            </EverMenu.Group>
                                        </EverMenu>            
                                    }
                                >
                                    <Button
                                        {...(Width > 1000) 
                                                ? ({endIcon: <IoNavigateOutline />}) 
                                                : ({ startIcon: <IoNavigateOutline /> })}
                                        variant='text'
                                    >Navegación Rápida</Button>
                                </Popover>
                            </div>
                        </div>

                        <img
                            src={TeamWorkConcept}
                            alt='Ilustración de trabajo en equipo' />
                    </article>

                    <i 
                        onClick={() => scroller.scrollTo('Campaign-Box', { duration: 100, delay: 0, offset: (Width < 1000) ? (-100) : (0), smooth: true })}
                    >
                        <IoIosArrowDown />
                    </i>
                </section>

                <ColorsBox
                    InfoBox={{
                        Title: 'Una nueva misión asignada, innovar con amor y respeto al arte',
                        Description: 'Nuestra lista está compuesta por personas maravillosas, individuos capaces de transformar lo ordinario en cosas extraordinarias nunca antes presentadas. Nuestra misión es mejorar significativamente la estancia de los estudiantes y asistentes de la educación.'
                    }}
                    ComplementBox={{
                        Title: '¡Porque de tu voto depende tu futuro, en estas elecciones vota informado!',
                        Description: 'La presencia salesiana en Talca alberga a unos 2.000 alumnos. ¡Tu voto es muy importante! Porque estarás votando por un grupo de estudiantes que representarán a tu establecimiento, en estas elecciones te invitamos a votar con conciencia, tu futuro con el del resto de los estudiantes está en juego.'
                    }}
                />

                <Element name='Campaign-Box' id='Campaign-Box'>
                    <article id='Left-Box'>
                        <h3>¿Por qué votar por nosotros?</h3>
                        <div id='Features-Box'>
                            {Features.map(([ Icon, Text ], Index) => (
                                <div key={Index}>
                                    <i>
                                        {Icon}
                                    </i>
                                    <span>{Text}</span>
                                </div>
                            ))}
                        </div>
                    </article>

                    <article id='Right-Box'>
                        <div>
                            <h3>Cartas de recomendación</h3>
                            <p>Las cartas de recomendación son documentos elaborados por docentes donde describen y recomiendan a un estudiante, en este caso, para pertenecer al Centro General de Estudiantes; A continuación, tienes a tu disposición las diferentes cartas que tienen nuestros integrantes, las cuales solo dejan evidenciar a las maravillosas personas que componen nuestra lista.</p>
                        </div>
                        <div id='Recommendations-Letters-Box'>
                            {Settings.RecommendationLetters.map((Data, Index) => (
                                <div
                                    key={Index} 
                                    onClick={(Event) => (Event.target.classList.contains('Recommendation-Letter-File') || (document.getElementById(Index).contains(Event.target))) && (SetRecommendationLetter(Data))}
                                    className='Recommendation-Letter-File'
                                >
                                    <div id={Index} className='Basic-Info'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" version="1">
                                            <path
                                                style={{
                                                    blockProgression: "tb",
                                                    WebkitTextTransform: "none",
                                                    textTransform: "none",
                                                    WebkitTextIndent: "0",
                                                    textIndent: "0",
                                                }}
                                                fill="#dc5047"
                                                d="M2.35 1v.002A.45.45 0 002 1.44V14.56c0 .229.206.437.432.437H13.57a.452.452 0 00.432-.437V4.418a.458.458 0 00-.055-.192l-3.312-3.2A.427.427 0 0010.5 1H2.43a.432.432 0 00-.082 0zm5.005 2h.194a.69.69 0 01.492.195c.532.533.284 1.83.018 2.903-.017.048-.026.089-.034.113.323.911.783 1.645 1.291 2.064.21.162.443.322.702.467.362-.04.71-.057 1.041-.057 1 0 1.604.178 1.837.557.081.13.12.282.096.443a.78.78 0 01-.224.534c-.138.153-.378.24-.733.24-.613 0-1.615-.186-2.422-.598-1.387.154-2.42.342-3.25.608-.04.016-.088.03-.144.054-1 1.71-1.742 2.477-2.395 2.477a.72.72 0 01-.355-.09l-.387-.248-.025-.041a.731.731 0 01-.041-.435c.088-.427.55-1.106 1.517-1.711.153-.113.394-.242.717-.395.242-.42.501-.91.775-1.451.412-.83.668-1.652.87-2.361v-.01c-.299-.976-.475-1.564-.176-2.637.072-.306.338-.621.636-.621zm.122.5c-.017.024-.04.065-.057.098-.137.338-.129.926.057 1.652l.04-.031c.057-.258.081-.485.13-.662l.023-.13c.08-.459.065-.692-.072-.886L7.477 3.5zm.066 3.647a11.958 11.958 0 01-.816 1.933c-.162.306-.34.596-.405.838l.09-.031a15.23 15.23 0 012.695-.75c-.12-.08-.235-.17-.332-.258-.484-.411-.901-1.007-1.232-1.732zm3.361 2.216c-.056 0-.113 0-.185.08.588.258 1.16.412 1.531.412a.901.901 0 00.154-.015h.034c.04-.016.064-.027.072-.108-.016-.024-.032-.055-.072-.088-.081-.08-.405-.28-1.534-.28zm-5.863 1.459c-.17.097-.306.186-.387.25-.572.524-.934 1.055-.974 1.362.363-.121.837-.652 1.361-1.612z"
                                                color="#000"
                                            />
                                        </svg>
                                        <span>{Data.Campus}</span>
                                        <span>
                                            <span>{Data.Student}</span>
                                            <span className='Position'>{Data.Position}</span>
                                        </span>
                                    </div>

                                    <div className='Additional-Box'>
                                        <Popover
                                            position={Position.BOTTOM_RIGHT}
                                            content={
                                                <EverMenu>
                                                    <EverMenu.Group>
                                                        <EverMenu.Item
                                                            onClick={() => {
                                                                EventFire(document.getElementById('Home-Main'), 'click')
                                                                SetRecommendationLetter(Data)
                                                            }}
                                                            icon={<BsReverseLayoutTextWindowReverse />}
                                                        >Visualizar</EverMenu.Item>
                                                        <EverMenu.Item
                                                            onClick={() => {
                                                                DownloadExternalFile(GetFormattedPDFLink(Data.Document), `Carta de recomendación - ${Data.Student}.pdf`);
                                                                Alert.success();
                                                            }}
                                                            icon={<BsDownload />}
                                                        >Descargar</EverMenu.Item>
                                                    </EverMenu.Group>
                                                    <EverMenu.Divider />
                                                    <EverMenu.Group>
                                                        <EverMenu.Item
                                                            onClick={() => {
                                                                CopyToClipboard(window.location.host + GetFormattedPDFLink(Data.Document))
                                                                Alert.success();
                                                            }}
                                                            icon={<AiOutlineLink />}
                                                        >Copiar enlace</EverMenu.Item>
                                                        <EverMenu.Item
                                                            onClick={() => window.open(GetFormattedPDFLink(Data.Document), '_blank')}
                                                            icon={<BsWindow />}
                                                        >Abrir en una nueva pestaña</EverMenu.Item>
                                                    </EverMenu.Group>
                                                </EverMenu>
                                            }
                                        >
                                            <IconButton size='small'>
                                                <BsThreeDotsVertical />
                                            </IconButton>
                                        </Popover>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </article>
                </Element>
            </main>
        </>
    );
};

export default HomePage;
