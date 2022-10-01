import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
    return (
        <>
            <header>
            </header>

            <Outlet />

            <footer>
            </footer>
        </>
    );
};

export default Layout;