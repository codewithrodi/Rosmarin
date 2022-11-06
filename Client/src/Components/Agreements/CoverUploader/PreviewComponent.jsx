import React from 'react';
import { FormatDuration, ReadableFileSize } from '../../../Utilities/Algorithms';
import { VscDebugRestart } from 'react-icons/vsc';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoExitOutline } from 'react-icons/io5';

const PreviewComponent = (Properties) => {
    const {
        className,
        imageClassName,
        style,
        imageStyle,
        fileWithMeta: { cancel, remove, restart },
        meta: { name = '', percent = 0, size = 0, previewUrl, status, duration, validationError },
        isUpload,
        canCancel,
        canRemove,
        canRestart,
        extra: { minSizeBytes }
    } = Properties;
    // ! Image hover
    let Title = `${name || '?'}, ${ReadableFileSize(size)}`;
    if(duration)
        Title = `${Title}, ${FormatDuration(duration)}`;
    if(['error_file_size', 'error_validation'].includes(status))
        return (
            <div className={className} style={style}>
                <span className='dzu-previewFileNameError'>{Title}</span>
                {(status === 'error_file_size') ? (
                    <span>
                        {size < minSizeBytes ? 'File too small' : 'File too big'}
                    </span>
                ) : (
                    <span>{String(validationError)}</span>
                )}
                {(canRemove) && (
                    <span className='dzu-previewButton' onClick={remove}>Remove</span>
                )}
            </div>
        );
    if(['error_upload_params', 'exception_upload', 'error_upload'].includes(status))
        Title = `${Title} (Upload failed)`;
    if(status === 'aborted')
        Title = `${Title} (Cancelled)`;
    return (
        <figure className={className} style={style}>
            {(previewUrl) ? (
                <img 
                    className={imageClassName} 
                    style={imageStyle} 
                    src={previewUrl} 
                    alt={Title} 
                    title={Title} />
            ) : (
                <span className='dzu-previewFileName'>{Title}</span>
            )}
            <figcaption className='dzu-previewStatusContainer'>
                <div>
                    <p>La imagen ha sido almacenada localmente, al guardar los cambios, se enviará al servidor...</p>
                </div>
                <div>
                    {(isUpload) && (
                        <progress 
                            max={100} 
                            value={status === 'done' || status === 'headers_received' ? 100 : percent} />
                    )}
                    {(status === 'uploading' && canCancel) && (
                        <span className='dzu-previewButton' onClick={cancel}>
                            <IoExitOutline />
                        </span>
                    )}
                    {(status !== 'preparing' && status !== 'getting_upload_params' && status !== 'uploading' && canRemove) && (
                        <span className='dzu-previewButton' onClick={remove}>
                            <AiOutlineDelete />
                        </span>
                    )}
                    {(['error_upload_params', 'exception_upload', 'error_upload', 'aborted', 'ready'].includes(status)
                        && canRestart) && (
                            <span className='dzu-previewButton' onClick={restart}>
                                <VscDebugRestart />
                            </span>
                    )}
                </div>
            </figcaption>
        </figure>
    );
};

export default PreviewComponent;