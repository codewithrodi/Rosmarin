/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * For related information - https://github.com/CodeWithRodi/Rosmarin/
 *
 * Source code for Rosmarin, an open source platform designed for the general 
 * student center of the Salesian Institution in Talca, Chile.
 * 
 * (www.cgacest.com)
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 ****/

import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import { Settings, Validations } from '../../Infrastructure';
import { BsCursorText, BsChatLeftText } from 'react-icons/bs';
import { InputAdornment, TextField, Autocomplete } from '@mui/material';
import { CheckFormErrors, SetTitle as SetWindowTitle } from '../../Utilities/Runtime';
import { CoreContext } from '../../Services/Core/Context';
import FormSubmit from '../../Components/General/FormSubmit';
import CustomerSupportConcept from '../../Assets/Images/Contact/Customer-Support-Concept.png';

const ContactPage = () => {
    const { 
        GetError, 
        Contact,
        SetMessage: SetResponseMessage, 
        GetMessage: GetResponseMessage } = useContext(CoreContext);
    const [GetName, SetName] = useState('');
    const [GetEmail, SetEmail] = useState('');
    const [GetGrade, SetGrade] = useState('');
    const [GetDepartment, SetDepartment] = useState('');
    const [GetMessage, SetMessage] = useState('');
    const [GetTitle, SetTitle] = useState('');
    const [GetIsLoading, SetIsLoading] = useState(false);
    const [GetIsComponentMounted, SetIsComponentMounted] = useState(true);
    const [GetErrors, SetErrors] = useState({});
    const [GetIsFormInvalid, SetIsFormInvalid] = useState(false);
    const Validator = Validations.StandardIdentity;

    useEffect(() => {
        SetWindowTitle('Contacto');
        return () => {
            SetIsFormInvalid(false);
            SetErrors({});
            SetName('');
            SetEmail('');
            SetGrade('');
            SetDepartment('');
            SetMessage('');
            SetTitle('');
            SetIsLoading(false);
            SetIsComponentMounted(false);
        };
    }, []);

    useEffect(() => {
        SetIsFormInvalid(
            GetErrors.Name !== undefined ||
            GetErrors.Email !== undefined ||
            GetErrors.Grade !== undefined ||
            GetErrors.Department !== undefined ||
            GetErrors.Message !== undefined ||
            GetErrors.Title !== undefined ||
            !GetName.length ||
            !GetEmail.length ||
            !GetGrade.length ||
            !GetDepartment.length ||
            !GetMessage.length ||
            !GetTitle.length
        );
    }, [GetErrors]); // eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        SetErrors(CheckFormErrors({
            Validator: 'StandardIdentity',
            States: [
                {
                    Identifier: 'Email',
                    Getter: GetEmail,
                    Validations: ['IsEmail'],
                    OnIsEmailError: 'El correo electrónico que está ingresando no es válido, asegúrese de que sea correcto.'
                },
                {
                    Identifier: 'Name',
                    Getter: GetName,
                    OnLengthError: 'Asegúrate de ingresar tu nombre correctamente, debe tener entre {{MinLength}} y {{MaxLength}} caracteres.'
                },
                {
                    Identifier: 'Message',
                    Getter: GetMessage,
                    OnLengthError: 'El mensaje en el que nos informa sobre su solicitud debe tener entre {{MinLength}} y {{MaxLength}} caracteres, solucione esto para continuar.'
                },
                {
                    Identifier: 'Title',
                    Getter: GetTitle,
                    OnLengthError: 'El título de su solicitud debe tener entre {{MinLength}} y {{MaxLength}} caracteres, corríjalo para continuar.'
                },
                {
                    Identifier: 'Grade',
                    Getter: GetGrade,
                    OnEnumError: 'El grado seleccionado no corresponde a los establecidos: {{Enums}}.'
                },
                {
                    Identifier: 'Department',
                    Getter: GetDepartment,
                    OnEnumError: 'El departamento seleccionado no corresponde a los establecidos: {{Enums}}.'
                }
            ]
        }));
    }, [GetName, GetEmail, GetGrade, GetDepartment, GetMessage, GetTitle]);

    const HandleFormSubmit = (Event) => {
        Event.preventDefault();
        SetIsLoading(true);
        Contact({
            Name: GetName,
            Email: GetEmail,
            Grade: GetGrade,
            Department: GetDepartment,
            Title: GetTitle,
            Message: GetMessage
        })
        .then(() => {
            if(!GetIsComponentMounted)
                return;
            SetResponseMessage('Tu solicitud fue procesada correctamente, el personal del centro general de estudiantes se comunicará contigo a la brevedad, ten paciencia.');
            SetMessage('');
            SetTitle('');
        })
        .finally(() => (GetIsComponentMounted) && (SetIsLoading(false)));
    };

    return (
        <main id='Form-Control-Main'>
            <section className='Desktop-Box'>
                <article>
                    <h1>Contactando con el centro general de alumnos...</h1>
                    <p>Tenga la seguridad de que odiamos los procesos tediosos, enviar sus inquietudes o propuestas es más fácil de lo que piensa.</p>
                </article>

                <article>
                    <img src={CustomerSupportConcept} alt='Ilustración contacto CGA' />
                </article>
            </section>

            <form onSubmit={HandleFormSubmit} className='Space-Between'>
                <section>
                    <article>
                        <h1>Una mirada al proceso</h1>
                        <p>Solo debe rellenar los campos que aparecerán en el formulario con tus datos correspondientes, una vez enviado el formulario, nuestros miembros habrán recibido un email con tu petición y esta quedará guardada en nuestra base de datos.</p>
                    </article>
                </section>
                <section>
                    <article>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <FiUser />
                                    </InputAdornment>
                                )
                            }}
                            inputProps={{
                                minLength: Validator.Name.MinLength,
                                maxLength: Validator.Name.MaxLength
                            }}
                            autoFocus={window.innerWidth > 768}
                            type='text'
                            name='Name'
                            onChange={(Event) => SetName(Event.target.value)}
                            value={GetName}
                            placeholder='Ingresa tu nombre y apellido'
                            fullWidth={true}
                            error={GetErrors.Name}
                            helperText={(GetErrors.Name) ? GetErrors.Name : 'Déjanos conocer tu nombre, para que podamos identificarte por encima de los demás y podamos comunicarnos contigo si es necesario.'}
                        />
                    </article>

                    <article>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <AiOutlineMail />
                                    </InputAdornment>
                                )
                            }}
                            type='email'
                            name='Email'
                            onChange={(Event) => SetEmail(Event.target.value)}
                            value={GetEmail}
                            error={GetErrors.Email}
                            placeholder='Dirección de correo electronico'
                            fullWidth={true}
                            required={true}
                            helperText={(GetErrors.Email) ? GetErrors.Email : 'Su dirección de correo electrónico se utilizará para comunicarnos con usted si su solicitud y/o inquietud lo requiere.'}
                        />
                    </article>

                    <article>
                        <Autocomplete
                            onChange={(Event, Value) => SetGrade(Value[0])}
                            getOptionLabel={(Option) => Option[1]}
                            options={Object.entries(Settings.Grades)}
                            renderOption={(Properties, Option) => (
                                <li {...Properties}>
                                    <span>{Option[1]}</span>
                                </li>
                            )}
                            renderInput={(Parameters) => <TextField {...Parameters} label='Selecciona tu curso' />}
                        />
                        <div className={'Help-Text-Container'.concat((GetErrors.Grade) ? 'Error' : '')}>
                            <span>{GetErrors.Grade ? GetErrors.Grade : 'En caso de que seas un alumno del establecimiento y no un tercero o asistente educativo, infórmanos de tu curso.'}</span>
                        </div>
                    </article>

                    <article>
                        <Autocomplete
                            onChange={(Event, Value) => SetDepartment(Value[0])}
                            getOptionLabel={(Option) => Option[1]}
                            options={Object.entries(Settings.Departments)}
                            renderOption={(Properties, Option) => (
                                <li {...Properties}>
                                    <span>{Option[1]}</span>
                                </li>
                            )}
                            renderInput={(Parameters) => <TextField {...Parameters}  label='Departamento o Área' />}
                        />
                        <div className={'Help-Text-Container'.concat((GetErrors.Department) ? 'Error' : '')}>
                            <span>{GetErrors.Department ? GetErrors.Department : 'Seleccione el área o departamento según el asunto de su solicitud, si no está seguro, no puede seleccionar un departamento para enviarlo.'}</span>
                        </div>
                    </article>

                    <article>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <BsCursorText />
                                    </InputAdornment>
                                )
                            }}
                            inputProps={{
                                minLength: Validator.Title.MinLength,
                                maxLength: Validator.Title.MaxLength
                            }}
                            type='text'
                            name='Title'
                            onChange={(Event) => SetTitle(Event.target.value)}
                            value={GetTitle}
                            placeholder='Titulo o sujeto de tu petición'
                            fullWidth={true}
                            required={true}
                            error={GetErrors.Title}
                            helperText={GetErrors.Title ? GetErrors.Title : 'Empecemos por armar tu solicitud, comenzando con un título, por ejemplo, “Problemas en mi curso”, “Propuesta al Centro de Estudiantes”, entre otros.'}
                        />
                    </article>

                    <article>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <BsChatLeftText />
                                    </InputAdornment>
                                )
                            }}
                            inputProps={{
                                minLength: Validator.Message.MinLength,
                                maxLength: Validator.Message.MaxLength
                            }}
                            type='text'
                            name='Message'
                            onChange={(Event) => SetMessage(Event.target.value)}
                            value={GetMessage}
                            placeholder='Describenos tu petición o inquietud'
                            fullWidth={true}
                            required={true}
                            error={GetErrors.Message}
                            helperText={GetErrors.Message ? GetErrors.Message : 'Describa su inquietud o propuesta con el mayor detalle posible, para que podamos subsanar su solicitud lo antes posible.'}
                        />
                    </article>

                    {GetError && (
                        <article className='Error-Container'>
                            <p>{GetError}</p>
                        </article>
                    )}

                    {GetResponseMessage && (
                        <article className='Info-Container'>
                            <p>{GetResponseMessage}</p>
                        </article>
                    )}

                    <article>
                        <FormSubmit
                            IsFormInvalid={GetIsFormInvalid}
                            IsLoading={GetIsLoading}
                            Message='Enviar' />
                    </article>
                </section>
            </form>
        </main>
    );
};

export default ContactPage;