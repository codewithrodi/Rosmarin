import React from 'react';
import MaintanceImage from '../../../Assets/Images/General/Maintance-Image.jpg';
import { Button } from '@mui/material';
import './Home.css';

const HomePage = () => {
    return (
        <main id='Home-Main'>
            <section>
                <figure>
                    <img src={MaintanceImage} logo='Maintance-Image' />
                    <figcaption>
                        <p>El sitio actualmente se encuentra en construcción, inténtalo de nuevo más tarde.</p>
                    </figcaption>
                </figure>
            </section>
            <section>
                <Button
                    onClick={() => window.location.href = 'https://docs.google.com/forms/u/3/d/e/1FAIpQLSe-IQy4xVwFlV-_lqu5lCYlwXm_VYIojnXnOlSRMAya0YkWaw/viewform?usp=send_form'}
                    variant='outlined'
                >Formulario CGA</Button>
                <article className='Help-Text-Container'>
                    <p>Ingresando a nuestro formulario, puede informarnos sobre sus diferentes inquietudes para remediarlas o aportar ideas para tomar control de las mismas...</p>
                </article>
            </section>
        </main>
    );
}

export default HomePage;