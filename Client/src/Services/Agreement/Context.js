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

export const AgreementContext = createContext();

export const AgreementProvider = ({ children }) => {
    const [GetError, SetError] = useState('');
    const [GetAgreementServiceBuffer, SetAgreementServiceBuffer] = useState({});
    const [GetMessage, SetMessage] = useState('');
    const Setters = { OnErrorSetter: SetError };
    const Location = useLocation();
   
    const GetAllAgreements = () => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.GetAllAgreements,
            Arguments: []
        }
    });

    const UpdateAgreement = (Body, Identifier) => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.UpdateAgreement,
            Arguments: [Body, Identifier]
        }
    });

    const GetAgreement = (Slug) => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.GetAgreement,
            Arguments: [Slug]
        }
    });

    const DeleteAgreement = (Identifier) => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.DeleteAgreement,
            Arguments: [Identifier]
        }
    });

    const CreateAgreement = (Body) => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.CreateAgreement,
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
        if(!['/admin/agreements/update', '/agreements'].includes(Location.pathname) 
                && Object.keys(GetAgreementServiceBuffer).length)
            SetAgreementServiceBuffer({});
    }, [Location]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <AgreementContext.Provider
            value={{
                SetAgreementServiceBuffer,
                GetAgreementServiceBuffer,
                GetAllAgreements,
                DeleteAgreement,
                GetAgreement,
                CreateAgreement,
                UpdateAgreement,
                SetMessage,
                GetMessage,
                GetError,
                SetError,
            }}
        >
            {children}
        </AgreementContext.Provider>
    );
};