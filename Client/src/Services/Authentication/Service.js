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

import { GenericRequestToBackend, ReplaceURLParameters } from '../../Utilities/Runtime';

const AuthenticationID = 'ROSMARIN_AUTHENTICATION';

const ParseBodyCallback = (Body) => {
    // ! Username can't have whitespaces
    if(Body.Username !== undefined)
        Body.Username = Body.Username.replaceAll(' ', '');
    return Body;
};

export const HandleClientAuthentication = (Body) => {
    const AuthenticationData = { ...Body.Data };
    if(!Body.Token)
        return AuthenticationData;
    localStorage.setItem(AuthenticationID, JSON.stringify({ Token: Body.Token }));
    return AuthenticationData;
};

export const HandleClientLogout = () => {
    localStorage.removeItem(AuthenticationID);
    return null;
};

export const GetCurrentUserToken = () => {
    try{
        return JSON.parse(localStorage.getItem(AuthenticationID)).Token;
    }catch(GetTokenError){
        HandleClientLogout();
        return false;
    }
};

export const GetAllUsers = (Filter) =>
    GenericRequestToBackend({
        Path: 'auth/get-users',
        SendToken: true,
        Filter
    });

export const UpdateMyPassword = (Body) =>
    GenericRequestToBackend({
        Path: 'auth/update-my-password/',
        Method: 'PATCH',
        SendToken: true,
        Body
    })

export const ResetPassword = (Body, ResetPasswordToken) =>
    GenericRequestToBackend({
        Path: ReplaceURLParameters('auth/reset-password/:Token/', [ResetPasswordToken]),
        Method: 'PATCH',
        Body
    });

export const GetUser = (UserID) => 
    GenericRequestToBackend({
        Path: ReplaceURLParameters('auth/with-user/:Identifier/', [UserID]),
        Method: 'GET',
        SendToken: true
    });

export const DeleteUser = (UserID) =>
    GenericRequestToBackend({
        Path: ReplaceURLParameters('auth/with-user/:Identifier/', [UserID]),
        Method: 'DELETE',
        SendToken: true
    });

export const DeleteMe = () =>
    GenericRequestToBackend({
        Path: 'auth/delete-me/',
        Method: 'DELETE',
        SendToken: true
    });

export const UpdateUser = (Body, UserID) =>
    GenericRequestToBackend({
        Path: ReplaceURLParameters('auth/with-user/:Identifier/', [UserID]),
        Method: 'PATCH',
        SendToken: true,
        ParseBodyCallback,
        Body
    });

export const UpdateMyProfile = (Body) =>
    GenericRequestToBackend({
        Path: 'auth/update-me/',
        Method: 'PATCH',
        SendToken: true,
        ParseBodyCallback,
        Body
    });

export const ForgotPassword = (Body) => 
    GenericRequestToBackend({
        Path: 'auth/forgot-password/',
        Method: 'POST',
        Body
    });

export const MyProfile = () =>
    GenericRequestToBackend({
        Path: 'auth/get-me/',
        SendToken: true
    });

export const SignUp = (Body) =>
    GenericRequestToBackend({
        Path: 'auth/sign-up/',
        Method: 'POST',
        ParseBodyCallback,
        Body
    });

export const SignIn = (Body) => 
    GenericRequestToBackend({
        Path: 'auth/sign-in/',
        Method: 'POST',
        ParseBodyCallback,
        Body
    });