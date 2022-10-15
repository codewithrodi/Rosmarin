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

import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MakeServerRequest } from '../../Utilities/Runtime';
import * as Service from './Service';

export const CoreContext = createContext();

export const CoreProvider = ({ children }) => {
    const [GetError, SetError] = useState('');
    const [GetMessage, SetMessage] = useState('');
    const Setters = { OnErrorSetter: SetError };
    const Location = useLocation();

    const Contact = (Body) => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.Contact,
            Arguments: [Body]
        }
    });

    useEffect(() => {
        setTimeout(() => {
            const Footer = document.querySelector('#Document-Root footer');
            const FormControl = document.querySelector('#Document-Root #Form-Control-Main > form');
            ((FormControl && window.innerWidth <= 1000) && (
                Footer.style.marginTop = (
                    (FormControl.scrollHeight - FormControl.clientHeight) + 16) + 'px'));
        }, 100);
    }, [GetError, GetMessage]);

    useEffect(() => {
        SetError('');
        SetMessage('');
    }, [Location]);

    return (
        <CoreContext.Provider
            value={{
                SetMessage,
                GetMessage,
                GetError,
                SetError,
                Contact
            }}
        >
            {children}
        </CoreContext.Provider>
    )
};