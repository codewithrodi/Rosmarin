import React, { useState, useContext, useEffect } from 'react';
import { Validations } from '../../../Infrastructure';
import { AuthenticationContext } from '../../../Services/Authentication/Context';
import { CheckFormErrors, SetTitle } from '../../../Utilities/Runtime';
import { FiUser } from 'react-icons/fi';
import { TextField, InputAdornment } from '@mui/material';
import ForgotPasswordConcept from '../../../Assets/Images/Auth/Forgot-Password-Concept.png';
import FormSubmit from '../../../Components/General/FormSubmit';

const ForgotPasswordPage = () => {
    const { 
        GetMessage,
        SetMessage,
        ForgotPassword, 
        GetUser, 
        GetError } = useContext(AuthenticationContext)
    const [GetUsername, SetUsername] = useState('');
    const [GetErrors, SetErrors] = useState({});
    const [GetIsFormInvalid, SetIsFormInvalid] = useState(false);
    const [GetIsLoading, SetIsLoading] = useState(false);
    const Validator = Validations.Authentication;

    useEffect(() => {
        SetIsFormInvalid(GetErrors.Username !== undefined || !GetUsername.length);
    }, [GetErrors]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        SetTitle('Contraseña Olvidada');
        return () => {
            SetUsername('');
            SetErrors({});
            SetIsFormInvalid(false);
            SetIsLoading(false);
        };
    }, []);

    useEffect(() => {
        SetErrors(CheckFormErrors({
            Validator: 'Authentication',
            States: [
                {
                    Identifier: 'Username',
                    LengthWithoutWhitespaces: true,
                    Getter: GetUsername,
                    OnLengthError: 'El nombre de usuario debe contener entre {{MinLength}} y {{MaxLength}} caracteres de longitud.'
                }
            ]
        }));
    }, [GetUsername]);

    useEffect(() => {
        if(!GetUser)
            return;
        SetUsername(GetUser.Username);
    }, [GetUser]); // eslint-disable-line react-hooks/exhaustive-deps

    const HandleFormSubmit = (Event) => {
        Event.preventDefault();
        SetMessage('');
        SetIsLoading(true);
        ForgotPassword({
            Username: GetUsername
        })
        .then(() => SetMessage('Parece que todo salió bien, revisa tu correo electrónico, deberias tener el enlace para restablecer tu contraseña, si no encuentras nada, revisa tu carpeta de correo no deseado.'))
        .finally(() => SetIsLoading(false));
    };

    return (
        <main id='Form-Control-Main'>
            <section>
                <article>
                    <h1>La forma de recuperar tu contraseña olvidada...</h1>
                    <p>¿Has olvidado tu contraseña? No tienes absolutamente nada de qué preocuparte, es algo que nos puede pasar a todos de vez en cuando, y nosotros tenemos la solución para remediar tu situación.</p>
                </article>

                <article>
                    <img src={ForgotPasswordConcept} alt='Ilustración contraseña olvidada' />
                </article>
            </section>

            <form method='POST' onSubmit={HandleFormSubmit}>
                <section>
                    <article>
                        <h1>¡Ve a por ello!</h1>
                        <p>Solo debe ingresar el nombre de usuario de su cuenta, para que se le envíe un correo electrónico asociado a dicho nombre de usuario, el correo enviado contendrá un enlace válido por un tiempo suficiente para que pueda restablecer su contraseña.</p>
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
                                minLength: Validator.Username.MinLenght
                            }}
                            autoFocus={window.innerWidth > 768}
                            type='text'
                            name='Username'
                            onChange={(Event) => SetUsername(Event.target.value)}
                            value={GetUsername}
                            required={true}
                            placeholder='Nombre de usuario'
                            fullWidth={true}
                            error={GetErrors.Username}
                            helperText={GetErrors.Username ? GetErrors.Username : 'Ingrese el nombre de usuario que está vinculado a la cuenta que desea recuperar.'}
                        />
                    </article>

                    {GetError && (
                        <article className='Error-Container'>
                            <p>{GetError}</p>
                        </article>
                    )}

                    {GetMessage && (
                        <article className='Info-Container'>
                            <p>{GetMessage}</p>
                        </article>
                    )}

                    <article>
                        <FormSubmit
                            Message='Enviar Email'
                            IsFormInvalid={GetIsFormInvalid}
                            IsLoading={GetIsLoading} />
                    </article>
                </section>
            </form>
        </main>
    );
};

export default ForgotPasswordPage;