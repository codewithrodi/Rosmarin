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

const Mongoose = require('mongoose');
const Prompt = require('prompt-sync')({ sigint: true });
const DotEnv = require('dotenv');
const FileSystem = require('fs');

DotEnv.config({ path: './Settings.env' });
global.Validations = Object.assign({}, JSON.parse(FileSystem.readFileSync('./Validations.json')));

const User = require('./Models/User');

const Database = process.env.DATABASE_HOST.replace('<password>', process.env.DATABASE_PASSWORD);

const FormatInput = (Message) => `: (Input) => ${Message} << `;

const DropCollection = (CollectionName) =>
    Mongoose.connection.db.dropCollection(CollectionName, (DatabaseError) => {
        if(DatabaseError)
            return console.log(`An error has been ocurred while trying delete the collection "${CollectionName}".\n\nError: ${DatabaseError}`);
        console.log(`The collection "${CollectionName}" has been deleted successfully.`);
    });

const ConnectToDatabase = () => 
    new Promise((Resolve, Reject) => 
        Mongoose.connect(Database, { useNewUrlParser: true })
            .then(() => {
                console.log('You have successfully connected to the Mongo database');
                Resolve();
            })
            .catch(() => {
                console.log('An error has been ocurred while trying to connect to the Mongo database');
                Reject();
                process.exit();
            }));

const CreateSuperUser = async () => {
    const Default = {
        Username: 'admin',
        Email: 'admin@cgacest.com',
        Password: '55563019',
        PasswordConfirm: '55563019'
    };
    console.log('Creating a user with an administrator role...');
    const Username =
        Prompt(FormatInput(`Username (Default - ${Default.Username})`)) || Default.Username;
    const Email = Prompt(FormatInput(`Email: (Default - ${Default.Email})`)) || Default.Email;
    const Password =
        Prompt(FormatInput(`Password: (Default - ${Default.Password})`)) || Default.Password;
    const PasswordConfirm = Prompt(FormatInput(`Confirm the password`));
    if(Password !== PasswordConfirm){
        console.log('Passwords are not the same...');
        process.exit();
    }
    console.clear();
    console.log('Please wait...');
    try{
        await User.create({
            Username,
            Email,
            Password,
            PasswordConfirm,
            Role: 'Admin'
        });
        console.log('SuperUser has been created successfully');
        console.log(`Now you must enter the site and log in as ${Username}@${Password}`);
    }catch(UserCreationError){
        console.log(UserCreationError);
    }
};

const Callbacks = {
    createsuperuser: CreateSuperUser,
    dropusercollection: () => DropCollection('users')
};

(async () => {
    try{
        await ConnectToDatabase();
        const Arguments = process.argv.slice(2);
        if(!Arguments.length){
            console.log('No arguments detected, check the documentation and read about how to use the Manager.');
            process.exit();
        }
        Arguments.forEach((Instruction) => {
            console.clear();
            Instruction = Instruction.toLowerCase();
            if(Callbacks[Instruction] !== undefined)
                Callbacks[Instruction]();
            else
                console.log(`${Instruction} it is not a valid argument`);
        });
    }catch(ManagerRuntimeError){
        console.log(ManagerRuntimeError);
    }
})();