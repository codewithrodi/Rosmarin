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

import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import './FormSubmit.css';

const FormSubmit = ({ IsLoading = false, IsFormInvalid = false, Message, ...Properties }) => (
    IsLoading ? (
        <CircularProgress className='Circular-Loader' size={'2rem'} />
    ) : (
        <Button
            variant='outlined'
            disabled={IsFormInvalid}
            type='submit'
            {...Properties}
        >
            {Message}
        </Button>
    )
)

export default FormSubmit;