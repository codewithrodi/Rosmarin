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

import { GenericRequestToBackend, ReplaceURLParameters } from '../../Utilities/Runtime';

export const GetAllAgreements = () => 
    GenericRequestToBackend({
        Path: 'agreement/',
    });

export const GetAgreement = (Slug) =>
    GenericRequestToBackend({
        Path: ReplaceURLParameters('agreement/:Slug/', [Slug]),
        SendToken: true
    });

export const DeleteAgreement = (Identifier) =>
    GenericRequestToBackend({
        Path: ReplaceURLParameters('agreement/:Identifier/', [Identifier]),
        Method: 'DELETE',
        SendToken: true  
    });

export const UpdateAgreement = (Body, Identifier) =>
    GenericRequestToBackend({
        Path: ReplaceURLParameters('agreement/:Identifier/', [Identifier]),
        Method: 'PATCH',
        SendToken: true,
        Body
    })

export const CreateAgreement = (Body) =>
    GenericRequestToBackend({
        Path: 'agreement/',
        Method: 'POST',
        SendToken: true,
        Body
    })