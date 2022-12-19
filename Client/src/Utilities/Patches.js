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

if(typeof Node === 'function' && Node.prototype){
    const OriginalRemoveChild = Node.prototype.removeChild;
    Node.prototype.removeChild = function(Child){
        if(Child.parentNode !== this)
            return Child;
        return OriginalRemoveChild.apply(this, arguments);
    }
}

// TODO: This is a patch for the 'react-pdf' library, within 
// TODo: the next platform updates this library will have to 
// TODO: be changed to render PDF documents due to compatibility 
// TODO: problems, without this patch it is likely that the 
// TODO: page will NOT load on some devices.
Object.defineProperty(Array.prototype, 'at', {
    value: function(Iterator){
        return this[Iterator];
    },
    enumerable: false
});
