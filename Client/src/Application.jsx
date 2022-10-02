import React from 'react';
import { Routes as RoutesContainer, Route, useLocation } from 'react-router-dom';
import EverybodyPages from './Pages/Everybody';
import GuestPages from './Pages/Guest';
import GeneralComponents from './Components/General';

const Application = () => {
    const Location = useLocation();
    
    return (
        <RoutesContainer location={Location} key={Location.pathname}>
            <Route element={<GeneralComponents.Layout />}>
                <Route path='/' exact element={<EverybodyPages.Home />} />
                <Route path='/terms-and-privacy' element={<EverybodyPages.Privacy />} />
                <Route path='/agreements' element={<EverybodyPages.Agreements />} />
                <Route path='/auth/sign-in' element={<GuestPages.Auth.SignIn />} />
            </Route>
            <Route path='*' element={<EverybodyPages.NotFound />} />
        </RoutesContainer>
    );
};

export default Application;