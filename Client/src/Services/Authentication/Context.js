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

import React, { createContext, useState, useEffect, useContext } from 'react';
import { MakeServerRequest } from '../../Utilities/Runtime';
import { CoreContext } from '../Core/Context';
import * as Service from './Service';

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
    const { 
        GetError,
        SetError,
        SetMessage,
        GetMessage
     } = useContext(CoreContext);
    const [GetUser, SetUser] = useState(null);
    const [GetIsLoading, SetIsLoading] = useState(true);
    const Setters = { OnErrorSetter: SetError };
    const RequiredFields = ['Username'];
    const SortFields = [
        ['Username', 'Username'],
        ['Email', 'Email'],
        ['Role', 'Role']
    ];
    const FilterFields = [
        ['Email', 'Email'],
        ['Role', 'Role']
    ];

    const GetAllUsers = (Filter) => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.GetAllUsers,
            Arguments: [Filter]
        }
    });

    const UpdateMyPassword = (Body) => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.UpdateMyPassword,
            Arguments: [Body]
        }
    });

    const DeleteUser = (UserID) => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.DeleteUser,
            Arguments: [UserID]
        }
    });

    const UpdateUser = (Body, UserID) => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.UpdateUser,
            Arguments: [Body, UserID]
        }
    });

    const RetrieveUser = (UserID) => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.GetUser,
            Arguments: [UserID]
        } 
    });

    const UpdateProfile = (Body) => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.UpdateMyProfile,
            Arguments: [Body]
        },
        UpdateState: {
            Setter: SetUser,
            Callback: Service.HandleClientAuthentication,
            Arguments: [Body]
        }
    });

    const ForgotPassword = (Body) => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.ForgotPassword,
            Arguments: [Body]
        }
    });

    const SignIn = (Body) => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.SignIn,
            Arguments: [Body]
        },
        UpdateState: {
            Setter: SetUser,
            Callback: Service.HandleClientAuthentication,
            Arguments: [Body]
        }
    });

    const SignUp = (Body) => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.SignUp,
            Arguments: [Body]
        },
        UpdateState: {
            Setter: SetUser,
            Callback: Service.HandleClientAuthentication,
            Arguments: [Body]
        }
    });

    const ResetPassword = (Body, ResetPasswordToken) => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.ResetPassword,
            Arguments: [Body, ResetPasswordToken]
        }
    });

    const Logout = () => SetUser(Service.HandleClientLogout());

    const DeleteMe = () => MakeServerRequest({
        Setters,
        Axios: {
            Callback: Service.DeleteMe
        }
    });

    useEffect(() => {
        const CachedSessionToken = Service.GetCurrentUserToken();
        if(!CachedSessionToken)
            return SetIsLoading(false);
        MakeServerRequest({
            Setters: { OnErrorSetter: SetError },
            Axios: { Callback: Service.MyProfile }
        })
        .then((Response) => SetUser(Response.Data))
        .finally(() => SetIsLoading(false));
        return () => {
            SetUser({});
            SetIsLoading(false);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <AuthenticationContext.Provider
            value={{
                IsAuthenticated: Boolean(GetUser),
                GetCurrentUserToken: Service.GetCurrentUserToken,
                GetUser,
                GetAllUsers,
                GetIsLoading,
                RetrieveUser,
                GetError,
                SetIsLoading,
                UpdateMyPassword,
                DeleteUser,
                RequiredFields,
                SortFields,
                FilterFields,
                UpdateUser,
                UpdateProfile,
                ForgotPassword,
                SetMessage,
                GetMessage,
                SignIn,
                SignUp,
                ResetPassword,
                Logout,
                DeleteMe
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};