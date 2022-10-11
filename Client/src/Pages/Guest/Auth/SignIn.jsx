import React, { useEffect, useState, useContext } from 'react';
import { Validations } from '../../../Infrastructure';
import { AuthenticationContext } from '../../../Services/Authentication/Context';
import { CheckFormErrors } from '../../../Utilities/Runtime';
import { InputAdornment, TextField } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SetTitle } from '../../../Utilities/Runtime';
import SignInConcept from '../../../Assets/Images/Auth/Sign-In-Concept.png';
import FormSubmit from '../../../Components/General/FormSubmit';

const SignInPage = () => {
    const [GetUsername, SetUsername] = useState('');
    const [GetPassword, SetPassword] = useState('');
    const [GetErrors, SetErrors] = useState({});
    const [GetIsLoading, SetIsLoading] = useState(false);
    const [GetIsFormInvalid, SetIsFormInvalid] = useState(false);
    const [GetIsComponentMounted, SetIsComponentMounted] = useState(true);
    const { SignIn, GetError } = useContext(AuthenticationContext);
    const Validator = Validations.Authentication;
    const Location = useLocation();
    const Navigate = useNavigate();

    useEffect(() => {
        SetTitle('Ingresar');
        return () => {
            SetUsername('');
            SetIsComponentMounted(false);
            SetPassword('');
            SetErrors({});
            SetIsFormInvalid(false);
            SetIsLoading(false);
        };
    }, []);

    useEffect(() => {
        SetIsFormInvalid(
            !GetUsername.length ||
            !GetPassword.length ||
            GetErrors.Username !== undefined ||
            GetErrors.Password !== undefined
        )
    }, [GetErrors]); // eslint-disable-line react-hooks/exhaustive-deps

    const HandleFormSubmit = (Event) => {
        Event.preventDefault();
        SetIsLoading(true);
        SignIn({
            Username: GetUsername,
            Password: GetPassword
        })
        .then(() => (GetIsComponentMounted) && 
            (Navigate(Location.state?.from?.pathname || '/', { replace: true })))
        .finally(() => (GetIsComponentMounted) && (SetIsLoading(false)));
    };

    useEffect(() => {
        SetErrors(CheckFormErrors({
            Validator: 'Authentication',
            States: [
                {
                    Identifier: 'Username',
                    LengthWithoutWhitespaces: true,
                    Getter: GetUsername,
                    OnLengthError: 'El nombre de usuario debe contener entre {{MinLength}} y {{MaxLength}} caracteres de longitud.'
                },
                {
                    Identifier: 'Password',
                    Getter: GetPassword,
                    OnLengthError: 'La contraseña debe tener entre {{MinLength}} y {{MaxLength}} caracteres de longitud.'
                }
            ]
        }));
    }, [GetPassword, GetUsername]);

    return (
        <main id='Form-Control-Main'>
            <section>
                <article>
                    <h1>Iniciar sesion en la plataforma</h1>
                    <p>Ingresa con tu usuario y contraseña para descubrir las diferentes herramientas de administración con las que cuenta este servicio.</p>
                </article>

                <article>
                    <img src={SignInConcept} alt='Ilustración de autenticación' />
                </article>
            </section>

            <form onSubmit={HandleFormSubmit}>
                <section>
                    <article>
                        <h1>¡En sus marchas!</h1>
                        <p>Sin tantos rodeos, iniciar sesión nunca antes había sido tan sencillo, introduce tu nombre de usuario junto con la contraseña correspondiente para autenticarte en la plataforma.</p>
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
                                maxLength: Validator.Username.MaxLength,
                                minLength: Validator.Username.MinLength
                            }}
                            autoFocus={window.innerWidth > 768}
                            type='text'
                            name='Username'
                            onChange={(Event) => SetUsername(Event.target.value)}
                            value={GetUsername}
                            error={GetErrors.Username}
                            required={true}
                            fullWidth={true}
                            placeholder='Nombre de usuario'
                            helperText={GetErrors.Username ? GetErrors.Username : 'Introduce tu nombre de usuario para acceder a la plataforma.'} 
                        />
                    </article>

                    <article>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <RiLockPasswordLine />
                                    </InputAdornment>
                                )
                            }}
                            inputProps={{
                                maxLength: Validator.Password.MaxLength,
                                minLength: Validator.Password.MinLength
                            }}
                            type='password'
                            name='Password'
                            required={true}
                            fullWidth={true}
                            error={GetErrors.Password}
                            value={GetPassword}
                            placeholder='Ingresa tu contraseña'
                            helperText={GetErrors.Password ? GetErrors.Password : 'Ingrese la contraseña que ha asociado con la cuenta con el nombre de usuario ingresado anteriormente.'}
                            onChange={(Event) => SetPassword(Event.target.value)} />
                    </article>

                    {GetError && (
                        <article className='Error-Container'>
                            <p>{GetError}</p>
                        </article>
                    )}

                    <article>
                        <FormSubmit
                            Message='Ingresar'
                            IsFormInvalid={GetIsFormInvalid}
                            IsLoading={GetIsLoading}
                        />
                    </article>
                </section>
            </form>
        </main>
    );
};

export default SignInPage;