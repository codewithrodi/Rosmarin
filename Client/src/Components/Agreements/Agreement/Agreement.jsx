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

import React, { useEffect, useRef, useContext, useState } from 'react';
import { GoLocation } from 'react-icons/go';
import { FormattedImageURL } from '../../../Infrastructure';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Popover, Menu as EverMenu, Position } from 'evergreen-ui';
import { IconButton } from '@mui/material';
import { AiOutlineInstagram } from 'react-icons/ai';
import { FiEdit2, FiFacebook } from 'react-icons/fi';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { AuthenticationContext } from '../../../Services/Authentication/Context';
import { AgreementContext } from '../../../Services/Agreement/Context';
import { BsTrash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Skeleton from './Skeleton';
import './Agreement.css';

const Agreement = ({ Data }) => {
    const { GetUser } = useContext(AuthenticationContext);
    const { SetAgreementServiceBuffer } = useContext(AgreementContext);
    const [GetIsImageLoading, SetIsImageLoading] = useState(true);
    const Navigate = useNavigate();
    const TitleReference = useRef(null);
    const OptionsReference = useRef(null);

    useEffect(() => {
        if(TitleReference && OptionsReference)
            OptionsReference.current.style.height = TitleReference.current.clientHeight + 'px';
        return () => {
            SetIsImageLoading(true);
        };
    }, []);

    return (
        <figure className='Agreement-Container'>
            {(GetIsImageLoading) && (
                <Skeleton IsImageLoading={true} />
            )}
            <img 
                onLoad={() => SetIsImageLoading(false)}
                hidden={GetIsImageLoading}
                src={FormattedImageURL(Data.Photo)} 
                alt='Ilustración del local' />
            <figcaption>
                <div ref={TitleReference} className='Title-Container'>
                    <h3>{Data.Title}</h3>
                    <p>{Data.Description}</p>
                </div>
                <div ref={OptionsReference} className='Options-Container'>
                    <IconButton size='small' onClick={() => window.location.href = Data.GoogleMapsURL}>
                        <GoLocation />
                    </IconButton>
                    <Popover
                        position={Position.BOTTOM_RIGHT}
                        content={
                            <EverMenu>
                                <EverMenu.Group>
                                    {(Data.Instagram?.length >= 1) && (
                                        <EverMenu.Item
                                            icon={<AiOutlineInstagram />}
                                            onClick={() => window.location.href = `https://www.instagram.com/${Data.Instagram}/`}
                                        >
                                            <span>Instagram</span>
                                        </EverMenu.Item>
                                    )}
                                    {(Data.Facebook?.length >= 1) && (
                                        <EverMenu.Item
                                            icon={<FiFacebook />}
                                            onClick={() => window.location.href = `https://www.facebook.com/${Data.Facebook}/`}
                                        >
                                            <span>Facebook</span>
                                        </EverMenu.Item>
                                    )}
                                    {(Data.WhatsappPhoneNumber?.length >= 1) && (
                                        <EverMenu.Item
                                            icon={<AiOutlineWhatsApp />}
                                            onClick={() => window.location.href = `https://wa.me/${Data.WhatsappPhoneNumber}`}
                                        >
                                            <span>Whatsapp</span>
                                        </EverMenu.Item>
                                    )}
                                </EverMenu.Group>
                                {(GetUser?.Role === 'admin') && (
                                    <>
                                        <EverMenu.Divider />
                                        <EverMenu.Group>
                                            <EverMenu.Item
                                                icon={<BsTrash />}
                                            >
                                                <span>Eliminar</span>
                                            </EverMenu.Item>
                                            <EverMenu.Item
                                                icon={<FiEdit2 />}
                                                onClick={() => {
                                                    SetAgreementServiceBuffer(Data);
                                                    Navigate(`/admin/agreements/update/${Data.Slug}/`);
                                                }}
                                            >
                                                <span>Editar</span>
                                            </EverMenu.Item>
                                        </EverMenu.Group>
                                    </>
                                )}
                            </EverMenu>
                        }
                    >
                        <IconButton size='small'>
                            <BsThreeDotsVertical />
                        </IconButton>
                    </Popover>
                </div>
            </figcaption>
        </figure>
    );
};

export default Agreement;