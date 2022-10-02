import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const Navigate = useNavigate();

    useEffect(() => {
        Navigate('/');
    }, []);
};

export default NotFoundPage;