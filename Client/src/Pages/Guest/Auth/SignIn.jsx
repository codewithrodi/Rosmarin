import React, { useEffect, useState } from 'react';
import { InputAdornment, TextField, Button } from '@mui/material';
import { FiUser } from 'react-icons/fi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { SetTitle } from '../../../Utilities/Runtime';
import SignInImage from '../../../Assets/Images/Auth/SignIn-Image.png';

const SignInPage = () => {
    const [GetUsername, SetUsername] = useState('');
    const [GetPassword, SetPassword] = useState('');

    useEffect(() => {
        SetTitle('Ingresar');
    }, []);

    return (
        <main id='Form-Control-Main'>
            <section>
                <article>
                    <h1>Iniciar sesion en la plataforma</h1>
                    <p>Ingresa con tu usuario y contraseña para descubrir las diferentes herramientas de administración con las que cuenta este servicio.</p>
                </article>

                <article>
                    <img src={SignInImage} alt='Sign In' />
                </article>
            </section>

            <form onSubmit={(Event) => Event.preventDefault()}>
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
                                maxLength: 8,
                                minLength: 4
                            }}
                            autoFocus={window.innerWidth > 768}
                            type='text'
                            name='Username'
                            onChange={(Event) => SetUsername(Event.target.value)}
                            value={GetUsername}
                            required={true}
                            fullWidth={true}
                            placeholder='Nombre de usuario'
                            helperText='Introduce tu nombre de usuario, debe tener entre 4 y 8 caracteres' />
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
                                maxLength: 16,
                                minLength: 8
                            }}
                            type='password'
                            name='Password'
                            required={true}
                            fullWidth={true}
                            value={GetPassword}
                            placeholder='Ingresa tu contraseña'
                            helperText='Ingresa la contraseña perteneciente a tu cuenta, esta debe tener entre 8 y 16 caracteres.'
                            onChange={(Event) => SetPassword(Event.target.value)} />
                    </article>

                    <article>
                        <Button
                            variant='outlined'
                            type='submit'
                        >
                            <span>Ingresar</span>
                        </Button>
                    </article>
                </section>
            </form>
        </main>
    );
};

export default SignInPage;