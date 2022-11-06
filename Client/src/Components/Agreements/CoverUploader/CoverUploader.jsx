import React from 'react';
import Dropzone from 'react-dropzone-uploader';
import PreviewComponent from './PreviewComponent';
import 'react-dropzone-uploader/dist/styles.css'
import './Styles.css';

const CoverUploader = ({ OriginalPhoto, SetPhoto, ...Arguments }) => (
    <Dropzone
        maxFiles={1}
        multiple={false}
        PreviewComponent={PreviewComponent}
        accept='.png, .jpg, .jpeg'
        inputContent={
            <figure id='Input-Content-Container'>
                <img {...Arguments} />
                <figcaption>
                    <p>Al cambiar la foto del acuerdo puedes mejorar o perjudicar la apariencia visual de la sección correspondiente de la página, ten cuidado.</p>
                </figcaption>
            </figure>
        }
        onChangeStatus={({ file }, status) => {
            SetPhoto((status === 'removed') ? (OriginalPhoto) : (file));
        }} />
);

export default CoverUploader;