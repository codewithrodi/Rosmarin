import React, { createContext, useContext, useEffect } from 'react';
import { AuthenticationContext } from '../Authentication/Context';

export const CoreContext = createContext();

export const CoreProvider = ({ children }) => {
    const { TryLoggedInWithCachedSessionToken } = useContext(AuthenticationContext);

    useEffect(() => {
        TryLoggedInWithCachedSessionToken();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <CoreContext.Provider
            value={{}}
        >
            {children}
        </CoreContext.Provider>
    )
};