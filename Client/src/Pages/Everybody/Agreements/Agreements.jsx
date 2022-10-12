import React, { useEffect } from 'react';
import ColorsBox from '../../../Components/ColorsBox';
import { SetTitle } from '../../../Utilities/Runtime';
import Bags from '../../../Assets/Images/Agreements/Bags.png'
import './Agreements.css';

const AgreementsPage = () => {
    useEffect(() => {
        SetTitle('Convenios');
    }, []);

    return (
        <main id='Agreements-Main'>
            <section id='Presentation-Box'>
                <article>
                    <h3>Convenios que poseen los estudiantes del establecimiento</h3>
                    <p>El Centro de Estudiantes a lo largo de su estadía, ejerciendo su rol, puede generar más convenios con lugares de distinta naturaleza, para que los estudiantes del establecimiento tengan mayores beneficios al momento de realizar una compra.</p>
                </article>

                <article>
                    <img src={Bags} alt='Bags' />
                </article>
            </section>

            <ColorsBox
                InfoBox={{
                    Title: '¿Qué damos a entender por convenio?',
                    Description: 'Cuando nos referimos a un convenio, hablamos de beneficios en lugares cuya naturaleza puede variar, en cuanto a los beneficios debemos darle relevancia a los descuentos monetarios, para que los estudiantes tengan más posibilidades a la hora de adquirir un artículo y/o servicio.'
                }}
                ComplementBox={{
                    Title: '¿Por qué lo hacemos?',
                    Description: 'Nuestro propósito como centro de estudiantes es ofrecer lo mejor de nuestra voluntad a los estudiantes, hayan votado o no por nosotros, buscamos el bien común, y la idea de hacer acuerdos con terceros abre una nueva puerta a la posibilidad de que el centro de estudiantes pueda brindar beneficios por sí solo a los estudiantes, ofreciendo así diversos tipos de beneficios en locales dentro de la ciudad.'
                }}
            />

            <section id='Agreements-Box'>
                <h2>¡Oops!</h2>
                <p>No se pudieron cargar los acuerdos, el sistema se encuentra actualmente en desarrollo, vuelva a intentarlo más tarde.</p>
            </section>
        </main>
    );
};

export default AgreementsPage;
