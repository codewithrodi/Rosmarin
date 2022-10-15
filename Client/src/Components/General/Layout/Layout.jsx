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

import React, { useContext, useEffect, useRef, useState } from 'react';
import SDBLogo from '../../../Assets/Images/General/SDB-Logo.png';
import Instagram from 'react-useanimations/lib/instagram';
import Facebook from 'react-useanimations/lib/facebook';
import UseAnimations from 'react-useanimations';
import Hamburger from 'hamburger-react'
import UseWindowSize from '../../../Hooks/WindowSize';
import { AuthenticationContext } from '../../../Services/Authentication/Context';
import { References } from '../../../Infrastructure';
import { AiOutlineShop } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';
import { GiBookshelf } from 'react-icons/gi';
import { FiGithub } from 'react-icons/fi';
import { MdOutlineDashboard } from 'react-icons/md';
import { BiWorld, BiLogOut } from 'react-icons/bi';
import { VscSignIn } from 'react-icons/vsc';
import { Popover, Menu as EverMenu, Position } from 'evergreen-ui';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
    const [Width] = UseWindowSize();
    const { IsAuthenticated, GetUser, Logout } = useContext(AuthenticationContext);
    const HeaderReference = useRef(null);
    const FooterReference = useRef(null);
    const Navigate = useNavigate();
    const [GetIsMenuEnabled, SetIsMenuEnabled] = useState(false);
    const [GetSticky, SetSticky] = useState({ IsSticky: false, Offset: 0 });

    const HandleWindowScroll = (ElementTopOffset, ElementHeight) => {
        if(window.pageYOffset > (ElementTopOffset + ElementHeight))
            SetSticky({ IsSticky: true, Offset: ElementHeight });
        else
            SetSticky({ IsSticky: false, Offset: 0 });
    };

    useEffect(() => {
        const Header = HeaderReference.current.getBoundingClientRect();
        const HandleWindowScrollEvent = () => HandleWindowScroll(Header.top, Header.height);
        window.addEventListener('scroll', HandleWindowScrollEvent);
        // TODO: Is it the best way to do this? The footer gave me thousands 
        // TODO: of problems, without knowing how to solve the issue that 
        // TODO: it did not fit with the content that was on 
        // TODO: the page, doing this, I solved it...
        const Main = document.querySelector('#Document-Root main');
        const FormControl = document.querySelector('#Document-Root #Form-Control-Main > form');
        ((FormControl && Width <= 1000) && (
            FooterReference.current.style.marginTop = (
                (FormControl.scrollHeight - FormControl.clientHeight) + 16) + 'px'));
        Main?.appendChild(FooterReference.current);
        document.addEventListener('click', (Event) => {
            const HamburgerMenuBox = document.querySelector('#Hamburger-Menu-Box');
            const EvergreenMenuBox = document.querySelector('#Evergreen-Menu-Box');
            if(!EvergreenMenuBox)
                SetIsMenuEnabled(false);
            else if(!(EvergreenMenuBox.contains(Event.target)) && !(HamburgerMenuBox.contains(Event.target)))
                SetIsMenuEnabled(false);
        });
        return () => {
            window.removeEventListener('scroll', HandleWindowScrollEvent);
            SetSticky({});
            SetIsMenuEnabled(false);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
    return (
        <div style={{ all: 'inherit', marginTop: GetSticky.Offset }}>
            <header
                ref={HeaderReference} 
                className={(GetSticky.IsSticky) ? ('Sticky') : ('')}
            >
                <article id='Logo-Box' onClick={() => Navigate('/')}>
                    <img src={SDBLogo} alt='Salesianos de Don Bosco Logo' />
                </article>
                <article id='Navegation-Box'>
                    <Link to='/'>Inicio</Link>
                    <Link 
                        onClick={() => window.location.href = References.Flickr}
                    >Memoria</Link>
                    <Link to='/terms-and-privacy'>Privacidad</Link>
                    <div id='Hamburger-Menu-Box'>
                        <Popover
                            position={Position.BOTTOM_LEFT}
                            content={
                                <div id='Evergreen-Menu-Box'>
                                    <EverMenu>
                                        <EverMenu.Group>
                                            <EverMenu.Item
                                                onClick={() => Navigate('/agreements')}
                                                icon={<AiOutlineShop />}
                                            >
                                                <span>Convenios</span>
                                            </EverMenu.Item>
                                            <EverMenu.Item
                                                disabled={true}
                                                icon={<GiBookshelf />}
                                            >
                                                <span>Biblioteca</span>
                                            </EverMenu.Item>
                                            {IsAuthenticated && GetUser.Role === 'admin' && (
                                                <EverMenu.Item
                                                    icon={<MdOutlineDashboard />}
                                                    onClick={() => Navigate('/admin/dashboard/')}
                                                >
                                                    <span>Dashboard</span>
                                                </EverMenu.Item>
                                            )}
                                        </EverMenu.Group>
                                        <EverMenu.Divider />
                                        <EverMenu.Group>
                                            {IsAuthenticated ? (
                                                <>
                                                    <EverMenu.Item
                                                        onClick={Logout}
                                                        icon={<BiLogOut />}
                                                    >
                                                        <span>Cerrar sesión</span>
                                                    </EverMenu.Item>
                                                </>
                                            ) : (
                                                <>
                                                    <EverMenu.Item
                                                        onClick={() => Navigate('/auth/sign-in')}
                                                        icon={<VscSignIn />}
                                                    >
                                                        <span>Ingresar</span>
                                                    </EverMenu.Item>
                                                </>
                                            )}
                                            <EverMenu.Item
                                                onClick={() => Navigate('/auth/forgot-password/')}
                                                icon={<RiLockPasswordLine />}
                                            >
                                                <span>Contraseña olvidada</span>
                                            </EverMenu.Item>
                                        </EverMenu.Group>
                                        <EverMenu.Divider />
                                        <EverMenu.Group>
                                            <EverMenu.Item
                                                onClick={() => window.location.href = References.Github}
                                                icon={<FiGithub />}
                                            >
                                                <span>Código fuente</span>
                                            </EverMenu.Item>
                                        </EverMenu.Group>
                                    </EverMenu>                                    
                                </div>
                            }
                        >
                            <i>
                                <Hamburger
                                    toggled={GetIsMenuEnabled}
                                    toggle={SetIsMenuEnabled}
                                    size={20}
                                    direction='right' />
                            </i>
                        </Popover>
                    </div>
                </article>
            </header>
            
            <Outlet />

            <footer ref={FooterReference}>
                <article id='Site-Box'>
                    <h4>Centro Educativo Salesianos Talca</h4>
                    <p>En busca del cambio del mundo tal cual lo conocemos a base de la sana convivencia, el amor y el esfuerzo.</p>
                </article>

                <article id='Social-Media-Box'>
                    <i onClick={() => window.location.href = References.Instagram}>
                        <UseAnimations animation={Instagram} />
                    </i>

                    <i onClick={() => window.location.href = References.Facebook}>
                        <UseAnimations animation={Facebook} />
                    </i>
                    <i 
                        className='Touchable'
                        onClick={() => window.location.href = References.CollegeWebsite}>
                        <BiWorld />
                    </i>
                </article>

                <article id='Legal-Box'>
                    <div id='Navegation-Box'>
                        <Link to='/terms-and-privacy'>Términos de uso y privacidad</Link>
                        <a
                            className='Touchable'
                            href={References.GForms}>Reportar inquietudes y/o ideas</a>
                    </div>
                    <div id='Copyright-Message'>
                        <p>Centro General de Alumnos © 2022</p>
                    </div>
                </article>
            </footer>
        </div>
    );
};

export default Layout;
