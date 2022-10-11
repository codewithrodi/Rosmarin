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