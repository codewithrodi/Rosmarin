import React, { useState, useContext, useEffect } from 'react';
import { Validations } from '../../../Infrastructure';
import { useNavigate, useParams } from 'react-router';
import { AuthenticationContext } from '../../../Services/Authentication/Context';
import { CheckFormErrors, SetTitle } from '../../../Utilities/Runtime';
import { RiLockPasswordLine } from 'react-icons/ri';
import { BsKeyboard } from 'react-icons/bs';
import { TextField, InputAdornment } from '@mui/material';
import ResetPasswordConcept from '../../../Assets/Images/Auth/Reset-Password-Concept.png';
import FormSubmit from '../../../Components/General/FormSubmit';

const ResetPasswordPage = () => {
    const [GetPassword, SetPassword] = useState('');
    const [GetPasswordConfirm, SetPasswordConfirm] = useState('');
    const [GetIsFormInvalid, SetIsFormInvalid] = useState(false);
    const [GetIsComponentMounted, SetIsComponentMounted] = useState(true);
    const [GetErrors, SetErrors] = useState({});
    const [GetIsLoading, SetIsLoading] = useState(false);
    const { ResetPassword, GetError, Logout } = useContext(AuthenticationContext);
    const { ResetPasswordToken } = useParams();
    const Validator = Validations.Authentication;
    const Navigate = useNavigate();

    useEffect(() => {
        SetTitle('Restablecer su contraseña');
        return () => {
            SetPassword('');
            SetPasswordConfirm('');
            SetIsFormInvalid(false);
            SetIsComponentMounted(false);
            SetErrors({});
            SetIsLoading(false);
        };
    }, []);

    useEffect(() => {
        SetIsFormInvalid(
            !GetPassword.length ||
            !GetPasswordConfirm.length ||
            GetErrors.Password !== undefined ||
            GetErrors.PasswordConfirm !== undefined
        )
    }, [GetErrors]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        SetErrors(CheckFormErrors({
            Validator: 'Authentication',
            States: [
                {
                    Identifier: 'Password',
                    Getter: GetPassword,
                    OnLengthError: 'La contraseña debe tener entre {{MinLength}} y {{MaxLength}} caracteres de longitud.'
                },
                {
                    Identifier: 'PasswordConfirm',
                    Getter: GetPasswordConfirm,
                    CompareWith: GetPassword,
                    OnCompareError: 'La contraseña que ingresó no coincide con la nueva ingresada anteriormente, debe ingresar exactamente la misma contraseña para continuar con su solicitud de restablecimiento.'
                }
            ]
        }));
    }, [GetPassword, GetPasswordConfirm]);

    const HandleFormSubmit = (Event) => {
        Event.preventDefault();
        SetIsLoading(true);
        ResetPassword({
            Password: GetPassword,
            PasswordConfirm: GetPasswordConfirm
        }, ResetPasswordToken)
        .then(() => {
            if(!GetIsComponentMounted)
                return;
            Logout();
            Navigate('/');
        })
        .finally(() => (GetIsComponentMounted) && (SetIsLoading(false)));
    };

    return (
        <main id='Form-Control-Main'>
            <section>
                <article>
                    <h1>Restablecer su contraseña, un cambio de claves para su cuenta.</h1>
                    <p>Dejando a un lado los procesos tediosos, restablecer su contraseña hasta ahora ha sido una tarea sencilla, entonces solo necesita completar el formulario a continuación para solucionar su problema.</p>
                </article>

                <article>
                    <img src={ResetPasswordConcept} alt='Ilustración, restablecer contraseña' />
                </article>   
            </section>

            <form method='POST' onSubmit={HandleFormSubmit}>
                <section>
                    <article>
                        <h1>¿Tienes tu cofre a mano?</h1>
                        <p>A continuación, debe ingresar su nueva contraseña que desea asociar a su cuenta, y luego confirmarla, una vez enviado el formulario, su contraseña ha sido restablecida.</p>
                    </article>
                </section>

                <section>
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
                            autoFocus={window.innerWidth > 768}
                            type='password'
                            name='Password'
                            required={true}
                            onChange={(Event) => SetPassword(Event.target.value)}
                            value={GetPassword}
                            placeholder='Password'
                            fullWidth={true}
                            error={GetErrors.Password}
                            helperText={GetErrors.Password ? GetErrors.Password : 'Para comenzar, comience ingresando la nueva contraseña que desea asociar con su cuenta.'}
                        />
                    </article>

                    <article>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position='start'>
                                        <BsKeyboard />
                                    </InputAdornment>
                                )
                            }}
                            inputProps={{
                                maxLength: Validator.Password.MaxLength,
                                minLength: Validator.Password.MinLength
                            }}
                            type='password'
                            name='Password.Confirm'
                            required={true}
                            onChange={(Event) => SetPasswordConfirm(Event.target.value)}
                            value={GetPasswordConfirm}
                            placeholder='PasswordConfirm'
                            error={GetErrors.PasswordConfirm}
                            fullWidth={true}
                            helperText={GetErrors.PasswordConfirm ? GetErrors.PasswordConfirm : 'Para confirmar su solicitud de restablecimiento, vuelva a ingresar la contraseña con la que desea asociar su cuenta.'}
                        />
                    </article>

                    {GetError && (
                        <article className='Error-Container'>
                            <p>{GetError}</p>
                        </article>
                    )}

                    <article>
                        <FormSubmit
                            IsFormInvalid={GetIsFormInvalid}
                            IsLoading={GetIsLoading}
                            Message='Aplicar cambios' />
                    </article>
                </section>
            </form>
        </main>
    );
};

export default ResetPasswordPage;