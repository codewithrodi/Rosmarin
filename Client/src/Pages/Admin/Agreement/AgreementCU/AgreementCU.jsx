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
import { Validations, FormattedImageURL } from '../../../../Infrastructure';
import { AgreementContext } from '../../../../Services/Agreement/Context';
import { CheckFormErrors } from '../../../../Utilities/Runtime';
import { FormatSlug } from '../../../../Utilities/Algorithms';
import { InputAdornment, TextField, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { SetTitle as SetPageTitle } from '../../../../Utilities/Runtime';
import { FileUploader, FileCard } from 'evergreen-ui';
import { BsCursorText, BsMap, BsWhatsapp, BsCardText } from 'react-icons/bs';
import { FiFacebook, FiInstagram } from 'react-icons/fi';
import Marketplace from '../../../../Assets/Images/Agreements/Marketplace.png';
import FormSubmit from '../../../../Components/General/FormSubmit';
import CoverUploader from '../../../../Components/Agreements/CoverUploader';
import './AgreementCU.css';

const CreateAgreementPage = () => {
    const [GetTitle, SetTitle] = useState('');
    const [GetDescription, SetDescription] = useState('');
    const [GetGoogleMapsURL, SetGoogleMapsURL] = useState('');
    const [GetIsComponentMounted, SetIsComponentMounted] = useState(true);
    const [GetPhoto, SetPhoto] = useState([]);
    const [GetFacebook, SetFacebook] = useState('');
    const [GetInstagram, SetInstagram] = useState('');
    const [GetWhatsappPhoneNumber, SetWhatsappPhoneNumber] = useState('');
    const [GetIsLoading, SetIsLoading] = useState(false);
    const [GetErrors, SetErrors] = useState({});
    const [GetIsFormInvalid, SetIsFormInvalid] = useState(false);
    const [GetIsLoadingAgreement, SetIsLoadingAgreement] = useState(false);
    const [GetIdentifier, SetIdentifier] = useState('');
    const [GetOriginalPhoto, SetOriginalPhoto] = useState('');
    const Validator = Validations.Agreement;
    const Navigate = useNavigate();
    const { Slug } = useParams();
    const { 
        GetError, 
        CreateAgreement, 
        GetAgreement,
        UpdateAgreement,
        GetAgreementServiceBuffer, 
        SetAgreementServiceBuffer } = useContext(AgreementContext);

    useEffect(() => {
        if(Slug){
            SetPageTitle(`Editando el acuerdo "${FormatSlug(Slug)}"`);
            if(Object.keys(GetAgreementServiceBuffer).length){
                const { 
                    Title, 
                    Description, 
                    GoogleMapsURL, 
                    Photo, 
                    Facebook, 
                    Instagram,
                    _id, 
                    WhatsappPhoneNumber } = GetAgreementServiceBuffer;
                SetTitle(Title);
                SetIdentifier(_id);
                SetDescription(Description)
                SetGoogleMapsURL(GoogleMapsURL);
                SetPhoto(Photo);
                SetOriginalPhoto(Photo);
                SetFacebook(Facebook);
                SetInstagram(Instagram);
                SetWhatsappPhoneNumber(WhatsappPhoneNumber);
            }else{
                SetIsLoadingAgreement(true);
                GetAgreement(Slug)
                .then((Response) => {
                    if(!GetIsComponentMounted)
                        return;
                    const {
                        Title,
                        Description,
                        GoogleMapsURL,
                        Photo,
                        Facebook,
                        _id,
                        Instagram,
                        WhatsappPhoneNumber } = Response.Data;
                    SetTitle(Title);
                    SetIdentifier(_id);
                    SetDescription(Description);
                    SetGoogleMapsURL(GoogleMapsURL);
                    SetPhoto(Photo);
                    SetOriginalPhoto(Photo);
                    SetFacebook(Facebook);
                    SetInstagram(Instagram);
                    SetWhatsappPhoneNumber(WhatsappPhoneNumber);
                })
                .catch(() => (GetIsComponentMounted) && (Navigate('/agreements')))
                .finally(() => (GetIsComponentMounted) && (SetIsLoadingAgreement(false)));
            }
        }else{
            SetPageTitle('Registrando un acuerdo nuevo');
        }
        return () => {
            SetPhoto([]);
            SetFacebook('');
            SetInstagram('');
            SetWhatsappPhoneNumber('');
            SetIsFormInvalid(false);
            SetErrors({});
            SetIsLoading(false);
            SetIdentifier('');
            SetTitle('');
            SetDescription('');
            SetGoogleMapsURL('');
            SetIsLoadingAgreement(false);
            SetIsComponentMounted(false);
            SetOriginalPhoto('');
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(Slug){
            const {
                Title,
                Description,
                Photo,
                GoogleMapsURL,
                Facebook,
                Instagram,
                WhatsappPhoneNumber } = GetAgreementServiceBuffer;
            SetIsFormInvalid(
                GetTitle === Title &&
                GetDescription === Description &&
                GetGoogleMapsURL === GoogleMapsURL &&
                GetFacebook === Facebook &&
                GetInstagram === Instagram &&
                GetWhatsappPhoneNumber === WhatsappPhoneNumber &&
                GetPhoto === Photo
            );
        }else
            SetIsFormInvalid(
                !GetTitle?.length ||
                !GetDescription?.length ||
                !GetGoogleMapsURL?.length ||
                GetErrors.Title !== undefined ||
                GetErrors.Description !== undefined ||
                GetErrors.GoogleMapsURL !== undefined ||
                GetPhoto[0]?.name?.length === undefined
            );
    }, [GetErrors]); // eslint-disable-line react-hooks/exhaustive-deps

    const HandleFormSubmit = (Event) => {
        Event.preventDefault();
        const Data = new FormData();
        Data.append('Photo', (Slug) ? (GetPhoto) : (GetPhoto[0]));
        Data.append('Title', GetTitle);
        Data.append('Description', GetDescription);
        Data.append('GoogleMapsURL', GetGoogleMapsURL);
        Data.append('Facebook', GetFacebook);
        Data.append('Instagram', GetInstagram);
        Data.append('WhatsappPhoneNumber', GetWhatsappPhoneNumber);
        SetIsLoading(true);
        SetAgreementServiceBuffer({});
        ((Slug) ? (UpdateAgreement) : (CreateAgreement))(...(Slug) ? ([Data, GetIdentifier]) : (Data))
            .then(() => (GetIsComponentMounted) && (Navigate('/agreements')))
            .finally(() => (GetIsComponentMounted) && (SetIsLoading(false)));
    };

    useEffect(() => {
        SetErrors(CheckFormErrors({
            Validator: 'Agreement',
            States: [
                {
                    Identifier: 'Title',
                    Getter: GetTitle,
                    OnLengthError: 'El título debe contener entre {{MinLength}} y {{MaxLength}} caracteres de longitud...'
                },
                {
                    Identifier: 'Description',
                    Getter: GetDescription,
                    OnLengthError: 'La descripción del acuerdo debe contener un total de {{MaxLength}} caracteres junto a un mínimo de {{MinLength}} caracteres de longitud.'
                },
                {
                    Identifier: 'GoogleMapsURL',
                    Getter: GetGoogleMapsURL,
                    Validations: ['IsURL'],
                    OnLengthError: 'La longitud de la URL es erronea, corrija por favor...',
                    OnIsURLError: 'La URL ingresada no es valida, por favor verifica que esta sea correcta...'
                }
            ]
        }));
    }, [GetTitle, GetDescription, GetGoogleMapsURL, GetPhoto]);

    return (
        <main id='Form-Control-Main' className='AgreementCU-Main'>
            <section>
                <article>
                    <h1>
                        {(Slug) ? (
                            <span>Actualizando los datos de un acuerdo...</span>
                        ) : (
                            <span>Registro de un nuevo acuerdo dentro de la plataforma</span>
                        )}
                    </h1>
                    <p>
                        {(Slug) ? (
                            <span>Puede actualizar completamente los datos que han sido definidos con anterioridad para el acuerdo "{FormatSlug(Slug)}", siguiendo el mismo proceso de creación.</span>
                        ) : (
                            <span>Puede registrar los acuerdos que desee, siempre que hayan sido firmados. Estos acuerdos serán visibles para los usuarios que visiten el sitio web, tenga cuidado con lo que escribe.</span>
                        )}
                    </p>
                </article>

                <article>
                    <img src={Marketplace} alt='Ilustración de negocio' />
                </article>
            </section>

            <form onSubmit={HandleFormSubmit} className='Space-Between'>
                {(Slug && GetIsLoadingAgreement) ? (
                    <section id='Form-Loading-Container'>
                        <CircularProgress size={'2rem'} className='Circular-Loader' />
                        <p>Solicitando la información del convenio "{FormatSlug(Slug)}" al servidor, tenga paciencia...</p>
                    </section>
                ) : (
                    <>
                        <section>
                            <article>
                                <h1>¡Vamos a hacerlo!</h1>
                                <p>
                                    {(Slug) ? (
                                        <span>Solo debe cambiar los valores que posee el acuerdo para que este pueda proceder a ser actualizado y guardado nuevamente en la base de datos.</span>
                                    ) : (
                                        <span>El registro de un nuevo contrato es bastante sencillo, basta con rellenar los datos del formulario para llevar a cabo su creación.</span>
                                    )}
                                </p>
                            </article>
                        </section>

                        <section>
                            <article>
                                <TextField
                                    inputProps={{
                                        maxLength: Validator.Title.MaxLength,
                                        minLength: Validator.Title.MinLength
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <BsCursorText />
                                            </InputAdornment>
                                        )
                                    }}
                                    autoFocus={window.innerWidth > 768}
                                    type='text'
                                    name='Title'
                                    onChange={(Event) => SetTitle(Event.target.value)}
                                    value={GetTitle}
                                    error={GetErrors.Title}
                                    required={true}
                                    fullWidth={true}
                                    placeholder="Título, por ejemplo, 'Heladería Calle 5'"
                                    helperText={GetErrors.Title ? GetErrors.Title : 'Ingresa el título del convenio, este será visible para poder distinguirlo de los demás que ya tengas establecidos en la base de datos de la plataforma.'} 
                                />
                            </article>

                            <article>
                                {(Slug) ? (
                                    <CoverUploader
                                        SetPhoto={SetPhoto}
                                        OriginalPhoto={GetOriginalPhoto}
                                        src={FormattedImageURL(GetPhoto)}
                                        alt={`${FormatSlug(Slug)} - Ilustración`}
                                    />
                                ) : (
                                    <FileUploader
                                        label='Sube una imagen del local con el que tienes el convenio'
                                        description='Esta foto servirá de ayuda para cuando tus visitantes vean los múltiples convenios firmados que posees'
                                        maxFiles={1}
                                        acceptedMimeTypes='.png, .jpg, .jpeg'
                                        onChange={(Files) => SetPhoto([Files[0]])}
                                        renderFile={(file) => {
                                            const { name, size, type } = file
                                            return (
                                            <FileCard
                                                key={name}
                                                name={name}
                                                src={window.URL.createObjectURL(GetPhoto[0])}
                                                onRemove={() => SetPhoto(null)}
                                                sizeInBytes={size}
                                                type={type}
                                            />
                                            )
                                        }}
                                        values={GetPhoto}
                                    />
                                )}
                            </article>

                            <article>
                                <TextField
                                    inputProps={{
                                        maxLength: Validator.Description.MaxLength,
                                        minLength: Validator.Description.MinLength
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <BsCardText />
                                            </InputAdornment>
                                        )
                                    }}
                                    type='text'
                                    name='Description'
                                    required={true}
                                    fullWidth={true}
                                    error={GetErrors.Description}
                                    value={GetDescription}
                                    placeholder='Ingresa una descripción'
                                    helperText={GetErrors.Description ? GetErrors.Description : 'Establece una pequeña descripción acerca del contenido del local de ventas.'}
                                    onChange={(Event) => SetDescription(Event.target.value)}
                                />
                            </article>

                            <article>
                                <TextField
                                    inputProps={{
                                        maxLength: Validator.GoogleMapsURL.MaxLength
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <BsMap />
                                            </InputAdornment>
                                        )
                                    }}
                                    type='url'
                                    name='GoogleMapsURL'
                                    required={true}
                                    fullWidth={true}
                                    error={GetErrors.GoogleMapsURL}
                                    value={GetGoogleMapsURL}
                                    placeholder='URL de la dirección en Google Maps'
                                    helperText={GetErrors.GoogleMapsURL ? GetErrors.GoogleMapsURL : 'Consulta la ubicación del local de ventas en Google Maps, de manera que obtengas el link y puedas mostrarlo hacia tus visitantes.'}
                                    onChange={(Event) => SetGoogleMapsURL(Event.target.value)}
                                />
                            </article>

                            <article>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <FiFacebook />
                                            </InputAdornment>
                                        )
                                    }}
                                    type='text'
                                    name='Facebook'
                                    required={false}
                                    fullWidth={true}
                                    value={GetFacebook}
                                    placeholder='Usuario de Facebook'
                                    helperText='Ingrese el usuario de Facebook del local de ventas.'
                                    onChange={(Event) => SetFacebook(Event.target.value)}
                                />
                            </article>

                            <article>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <FiInstagram />
                                            </InputAdornment>
                                        )
                                    }}
                                    type='text'
                                    name='Instagram'
                                    required={false}
                                    fullWidth={true}
                                    value={GetInstagram}
                                    placeholder='Usuario de Instagram'
                                    helperText='Ingrese el usuario de Instagram del local de ventas.'
                                    onChange={(Event) => SetInstagram(Event.target.value)}
                                />
                            </article>

                            <article>
                                <TextField
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <BsWhatsapp />
                                            </InputAdornment>
                                        )
                                    }}
                                    type='text'
                                    name='WhatsappPhoneNumber'
                                    required={false}
                                    fullWidth={true}
                                    value={GetWhatsappPhoneNumber}
                                    placeholder='Número de WhatsApp para contacto...'
                                    helperText='Ingrese el número de contacto del local de ventas.'
                                    onChange={(Event) => SetWhatsappPhoneNumber(Event.target.value)}
                                />
                            </article>

                            {GetError && (
                                <article className='Error-Container'>
                                    <p>{GetError}</p>
                                </article>
                            )}

                            <article>
                                <FormSubmit
                                    Message={(Slug) ? ('Guardar Cambios') : ('Registrar')}
                                    IsFormInvalid={GetIsFormInvalid}
                                    IsLoading={GetIsLoading}
                                />
                            </article>
                        </section>
                    </>
                )}
            </form>
        </main>
    );
};

export default CreateAgreementPage;