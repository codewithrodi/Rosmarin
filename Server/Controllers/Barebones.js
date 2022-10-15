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

const { CatchAsync, RuntimeError, SendEmail } = require('../Utilities/Runtime');

const ValidGrades = Object.keys(global.Configuration.Grades);
const ValidDepartments = Object.keys(global.Configuration.Departments);

exports.Contact = CatchAsync(async (Request, Response, Next) => {
    let { 
        Name, 
        Email, 
        Grade, 
        Department, 
        Message, 
        Title 
    } = Request.body;
    if(!Name || !Email || !Grade || !Department || !Message || !Title)
        return Next(new RuntimeError('CONTACT_NOT_ENOUGH_PARAMETERS'));
    if(!ValidGrades.includes(Grade) || !ValidDepartments.includes(Department))
        return Next(new RuntimeError('CONTACT_GRADE_OR_DEPARTMENT_ARE_INVALID'));
    const MaybeFirstName = (Name.split(' ').length > 1) ? (Name.split(' ')[0]) : (Name);
    Department = global.Configuration.Departments[Department];
    Grade = global.Configuration.Grades[Grade];
    try{
        await SendEmail({
            Email: 'contact@cgacest.com',
            Subject: Title,
            Message: `\Se ha detectado el envío de un mensaje cuyo remitente corresponde a ${Name} (${Email}) cuyo curso corresponde a ${Grade}, dando como resultado una solicitud, cuestión problemática, propuestas o proyectos futuros a desarrollar hacia el departamento o área ${Department}.\n\n${Title}\n${Message}`
        });
        SendEmail({
            Email,
            Subject: `¡Hemos recibido tu mensaje ${MaybeFirstName}!`,
            Message: `Hola ${Name}, gracias por comunicarse con nosotros a través de nuestra plataforma web (www.cgacest.com/contact/), su mensaje fue procesado para ser registrado y guardado exitosamente.\nTu solicitud al área ${Department} con el título "${Title}" será leído y atendido, si es necesario, nos pondremos en contacto con usted, tenga paciencia, Si necesita atención especializada, puede enviar un correo electrónico a (contacto@cgacest.com).\n\nEl Centro General de Estudiantes les desea una linda semana.`
        });
    }catch(ServerError){
        Response.status(500).json({
            Status: 'Error',
            Message: 'CONTACT_SEND_MAIL_ERROR'
        });
    }
    Response.status(200).json({
        Status: 'Success'
    });
});