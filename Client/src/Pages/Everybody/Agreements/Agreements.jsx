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

import React, { useEffect, useState, useContext } from 'react';
import ColorsBox from '../../../Components/General/ColorsBox';
import Bags from '../../../Assets/Images/Agreements/Bags.png'
import Agreement from '../../../Components/Agreements/Agreement';
import Skeleton from '../../../Components/Agreements/Agreement/Skeleton';
import UseWindowSize from '../../../Hooks/WindowSize';
import { AgreementContext } from '../../../Services/Agreement/Context';
import { BiMessageSquare } from 'react-icons/bi';
import { AiOutlineTeam } from 'react-icons/ai';
import { IoNavigateOutline } from 'react-icons/io5';
import { SetTitle } from '../../../Utilities/Runtime';
import { Button } from '@mui/material';
import { scroller } from 'react-scroll';
import { Popover, Menu as EverMenu, Position } from 'evergreen-ui';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IoIosArrowDown } from 'react-icons/io';
import { GenerateArray } from '../../../Utilities/Algorithms';
import './Agreements.css';

const AgreementsPage = () => {
    const [Width] = UseWindowSize();
    const Navigate = useNavigate();
    const [SearchParameters] = useSearchParams();
    const { GetAllAgreements } = useContext(AgreementContext);
    const [GetIsLoading, SetIsLoading] = useState(false);
    const [GetIsComponentMounted, SetIsComponentMounted] = useState(true);
    const [GetAgreements, SetAgreements] = useState([]);

    useEffect(() => {
        SetTitle('Convenios');
        SetIsLoading(true);
        GetAllAgreements()
            .then(({ Data }) => (GetIsComponentMounted) && (SetAgreements(Data)))
            .finally(() => SetIsLoading(false));
        switch(SearchParameters.get('Instruction') || ''){
            case 'SeeAgreements':
                scroller.scrollTo('Agreements-Box', { 
                    duration: 100, 
                    delay: 0, 
                    offset: (Width < 1000) ? (-350) : (0), 
                    smooth: true 
                });
                break;
            default:
        };
        return () => {
            SetIsLoading(false);
            SetIsComponentMounted(false);
            SetAgreements([]);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <main id='Agreements-Main' className='Generic-WBox-Main'>
            <section id='Welcome-Box'>
                <article id='Content-Box'>
                    <div>
                        <h3>¡Fomentamos la exclusividad en el alumno Salesiano!</h3>
                        <p>¡Conoce todos nuestros convenios que tenemos disponibles con diferentes tiendas dentro de la ciudad, interactúa con sus redes sociales de forma rápida y sencilla gracias a nuestra plataforma!</p>
                        <div id='Quick-Navegation-Box'>
                            {(Width > 768) ? (
                                <>
                                    <Button
                                        startIcon={<BiMessageSquare />}
                                        onClick={() => Navigate('/contact')}
                                        variant='contained'
                                    >Contactanos</Button>

                                    <Button
                                        startIcon={<AiOutlineTeam />}
                                        onClick={() => Navigate('/?Instruction=SeeLettersOfRecommendation')}
                                        variant='text'
                                    >Nosotros</Button>
                                </>
                            ) : (
                                <Popover
                                    position={Position.BOTTOM_RIGHT}
                                    content={
                                        <EverMenu>
                                            <EverMenu.Group>
                                                <EverMenu.Item
                                                    icon={<BiMessageSquare />}
                                                    onClick={() => Navigate('/contact')}
                                                >Contactanos</EverMenu.Item>
                                                <EverMenu.Item
                                                    icon={<AiOutlineTeam />}
                                                    onClick={() => Navigate('/?Instruction=SeeLettersOfRecommendation')}
                                                >Nosotros</EverMenu.Item>
                                            </EverMenu.Group>
                                        </EverMenu>            
                                    }
                                >
                                    <Button 
                                        startIcon={<IoNavigateOutline />} 
                                        variant='text'
                                    >Navegación Rápida</Button>
                                </Popover>
                            )}
                        </div>
                    </div>

                    <img
                        src={Bags}
                        alt='Ilustración de compras' />
                </article>

                <i 
                    onClick={() => scroller.scrollTo('Agreements-Box', { duration: 100, delay: 0, offset: (Width < 1000) ? (-100) : (0), smooth: true })}
                >
                    <IoIosArrowDown />
                </i>
            </section>

            <ColorsBox
                InfoBox={{
                    Title: '¿Qué damos a entender por convenio?',
                    Description: 'Cuando nos referimos a un convenio, hablamos de beneficios en lugares cuya naturaleza puede variar, en cuanto a los beneficios debemos darle relevancia a los descuentos monetarios, para que los estudiantes tengan más posibilidades a la hora de adquirir un artículo y/o servicio.'
                }}
                ComplementBox={{
                    Title: '¿Por qué lo hacemos?',
                    Description: 'Como Centro General de Alumnos buscamos ofrecer una grata experiencia a los estudiantes, hayan votado o no por nosotros, buscamos el bien común, y la idea de hacer acuerdos con terceros abre una nueva puerta a la posibilidad de que el Centro de Alumnos pueda brindar beneficios por sí solo a los estudiantes, ofreciendo así diversos tipos de beneficios en locales dentro de la ciudad.'
                }}
            />

            <section id='Agreements-Box'>
                {(GetIsLoading) ? (
                    (GenerateArray(8).map(() => (<Skeleton />)))
                ) : (
                    (GetAgreements.map((Data, Index) => (
                        <Agreement
                            GetAgreements={GetAgreements}
                            SetAgreements={SetAgreements}
                            key={Index}
                            Data={Data}
                        />
                    )))
                )}
            </section>
        </main>
    );
};

export default AgreementsPage;
