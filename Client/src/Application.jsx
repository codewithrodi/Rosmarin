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

import React from 'react';
import { Routes as RoutesContainer, Route, useLocation } from 'react-router-dom';
import EverybodyPages from './Pages/Everybody';
import GuestPages from './Pages/Guest';
import AdminPages from './Pages/Admin';
import GeneralComponents from './Components/General';

const Application = () => {
    const Location = useLocation();
    
    return (
        <RoutesContainer location={Location} key={Location.pathname}>
            <Route element={<GeneralComponents.Layout />}>
                {/* Everybody Pages */}
                <Route path='/' exact element={<EverybodyPages.Home />} />
                <Route path='/terms-and-privacy/' element={<EverybodyPages.Privacy />} />
                <Route path='/agreements/' element={<EverybodyPages.Agreements />} />
                <Route path='/contact/' element={<EverybodyPages.Contact />} />
                <Route path='/about-us/' element={<EverybodyPages.AboutUs />} />
                <Route path='/auth/forgot-password/' element={<EverybodyPages.Auth.ForgotPassword />} />
                <Route path='/auth/reset-password/:ResetPasswordToken/' element={<EverybodyPages.Auth.ResetPassword />} />

                {/* Guest Pages */}
                <Route element={<GeneralComponents.ProtectedRoute Mode='Guest' />}>
                    <Route path='/auth/sign-in/' element={<GuestPages.Auth.SignIn />} />
                </Route>

                {/* Admin Pages */}
                <Route element={<GeneralComponents.ProtectedRoute Mode='Protect' RestrictTo='Admin' />}>
                    <Route path='/admin/dashboard/' element={<AdminPages.Dashboard />} />
                    <Route path='/admin/agreement/create/' element={<AdminPages.Agreement.AgreementCU />} />
                    <Route path='/admin/agreements/update/:Slug/' element={<AdminPages.Agreement.AgreementCU />} />
                </Route>
            </Route>
            <Route path='*' element={<EverybodyPages.NotFound />} />
        </RoutesContainer>
    );
};

export default Application;