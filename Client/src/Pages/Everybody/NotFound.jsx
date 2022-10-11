import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const Navigate = useNavigate();

    useEffect(() => {
        Navigate('/');
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default NotFoundPage;