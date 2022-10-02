import React from 'react';
import './ColorsBox.css';

const ColorsBox = ({ 
    InfoBox = { 
        Title: '', 
        Description: '' 
    }, 
    ComplementBox = { 
        Title: '', 
        Description: '' 
    } 
}) => (
    <section className='Colors-Box'>
        <article className='Info-Box'>
            <h3>{InfoBox.Title}</h3>
            <p>{InfoBox.Description}</p>
        </article>
        <article className='Complement-Box'>
            <h3>{ComplementBox.Title}</h3>
            <p>{ComplementBox.Description}</p>
        </article>
    </section>
);

export default ColorsBox;