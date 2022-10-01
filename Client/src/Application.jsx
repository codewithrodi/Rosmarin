import React from 'react';
import { Routes as RoutesContainer, Route, useLocation } from 'react-router-dom';
import EverybodyPages from './Pages/Everybody';
import GeneralComponents from './Components/General';

const Application = () => {
    const Location = useLocation();
    
    return (
        <RoutesContainer location={Location} key={Location.pathname}>
            <Route element={<GeneralComponents.Layout />}>
                <Route path='/' exact element={<EverybodyPages.Home />} />
            </Route>
        </RoutesContainer>
    );
};

export default Application;