import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthenticationContext } from '../../Services/Authentication/Context';

const ProtectedRoute = ({ Mode, RestrictTo = undefined }) => {
    const { IsAuthenticated, GetIsLoading, GetUser } = useContext(AuthenticationContext);
    const Location = useLocation();

    return GetIsLoading ? (
        <p>Loading...</p>
    ) : RestrictTo !== undefined ? (
        GetUser && GetUser.Role.toLowerCase().includes(RestrictTo.toLowerCase()) ?
            (<Outlet />) : (<Navigate to='/' />)
    ) : Mode === 'Protect' ? (
        !IsAuthenticated ? 
            (<Navigate to='/auth/sign-in/' state={{ from: Location }} />) : (<Outlet />)
    ) : IsAuthenticated ? 
        (<Navigate to='/' state={{ from: Location }} />) : (<Outlet />)
};

export default ProtectedRoute;