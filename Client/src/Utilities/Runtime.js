import NodeValidator from 'validator';
import Axios from './Axios';
import { GetCurrentUserToken } from '../Services/Authentication/Service';
import { Validations, Settings } from '../Infrastructure';

const ServerErrors = {
    NETWORK_ERROR: 'Ocurrió un error al establecer la comunicación con el servidor, intente nuevamente más tarde.',
    UNKNOWN_ERROR: 'Se produjo un error desconocido al procesar su solicitud, inténtelo de nuevo más tarde.',
    AUTH_INVALID_CREDENTIALS: 'Las credenciales ingresadas para autenticarte no son válidas, verifica los datos y vuelve a intentarlo.',
    AUTH_USERNAME_MINLENGTH: 'El nombre de usuario no tiene el conjunto mínimo de caracteres.',
    AUTH_USERNAME_MAXLENGTH: 'El nombre de usuario no tiene el conjunto máximo de caracteres.',
    AUTH_USERNAME_NOT_PROVIDED: 'El nombre de usuario no fue recibido por el servidor, verifique los datos enviados.',
    AUTH_EMAIL_NOT_PROVIDED: 'El correo electrónico no fue recibido por el servidor, por favor verifique los datos enviados.',
    AUTH_INVALID_EMAIL: 'El correo electrónico no es válido, verifíquelo y vuelva a intentarlo.',
    AUTH_PASSWORD_NOT_PROVIDED: 'El servidor no recibió la contraseña, verifique los datos ingresados ​​e intente nuevamente.',
    AUTH_PASSWORD_MINLENGTH: 'La contraseña no cumple con el mínimo de caracteres establecidos, por favor verifique los datos ingresados ​​y vuelva a intentarlo.',
    AUTH_PASSWORD_MAXLENGTH: 'La contraseña no cumple con el máximo de caracteres establecidos, por favor verifique los datos ingresados ​​y vuelva a intentarlo.',
    AUTH_PASSWORD_CONFIRM_NOT_PROVIDED: 'La confirmación y/o repetición de la contraseña no fue recibida por el servidor, por favor verifique los datos ingresados ​​y vuelva a intentarlo.',
    AUTH_PASSWORD_NOT_SAME: 'Las contraseñas ingresadas no son las mismas, verifique los datos ingresados ​​e intente nuevamente.',
    AUTH_USERNAME_AND_PASSWORD_NOT_PROVIDED: 'El servidor no recibió el nombre de usuario y la contraseña, verifique los datos ingresados ​​​​e intente nuevamente.',
    AUTH_USER_NOT_FOUND: 'Ha ocurrido un error, el usuario solicitado no fue encontrado en la base de datos, verifique los datos ingresados ​​e intente nuevamente.',
    AUTH_FORGOT_PASSWORD_EMAIL_ERROR: 'Ocurrió un error al procesar la solicitud de cambio de contraseña, intente nuevamente más tarde.',
    AUTH_INVALID_TOKEN: 'El token recibido no es válido, comprueba que es correcto.',
    AUTH_CURRENT_PASSWORD_WRONG: 'La contraseña actual no es válida, verifique que sea correcta para completar con éxito su solicitud, intente nuevamente.',
    AUTH_EXPIRED_TOKEN: 'Se ha detectado que el token que recibió el servidor no es válido, el token ha caducado, solicite uno nuevo para completar esta solicitud.',
    AUTH_NEW_PASSWORD_AND_OLD_PASSWORD_ARE_SAME: 'La contraseña actual y la nueva contraseña son iguales, debe ingresar contraseñas diferentes para realizar el restablecimiento y/o cambio de contraseña.'
};

export const FormatString = ({ UnformattedString, Values }) => {
    Object.keys(Values).forEach((Key) =>
        UnformattedString = UnformattedString.replaceAll(`{{${Key}}}`, Values[Key]));
    return UnformattedString;
};

export const ReplaceURLParameters = (URL, Parameters = []) => {
    // TODO: Another way of do it more efficient?
    // ! URLs must be defined as /0/1/2/3/:Parameter/:Parameter/4/5/
    // ! I mean, it must start with a '/' and end with it in the paths 
    // ! defined in Settings.json, a file that is in the 
    // ! source code of the server.

    // ! If we apply the above, when doing a split to 
    // ! the URL we should get something like
    // ! ['0', '1', '2', '3', ':Parameter', ':Parameter', '4', '5']
    // ! Original: /0/1/2/3/:Parameter/:Parameter/4/5/
    const Parts = URL.split('/');

    // ! We will create a variable where we will 
    // ! store the original URL with the parameters.
    let ParsedURL = '';

    // ! Now, as we have the parts of the URL, with the help of a foreach 
    // ! we will parse the URL, if the received part starts with ':' it 
    // ! means that it should belong to a parameter, if so, how do we 
    // ! receive an array with the parameters in order that the URL should 
    // ! receive, with the help of a .shift() function that returns and 
    // ! removes the first index of the array, we will concatenate it with our URL.
    Parts.forEach((Part) => {
        if(Part.startsWith(':'))
            ParsedURL += Parameters.shift();
        else
            ParsedURL += Part;
        if(!ParsedURL.endsWith('/'))
            ParsedURL += '/';
    });
    // ! Finally, we return the already parsed 
    // ! URL along with all its parameters.
    return ParsedURL;
};

export const MakeServerRequest = async ({
    Axios = {
        Callback: undefined,
        Arguments: undefined
    },
    UpdateState = {
        Setter: undefined,
        Callback: undefined
    },
    Setters = { OnErrorSetter: undefined },
}) => new Promise(async (Resolve, Reject) => {
    let Response;
    try{
        Setters.OnErrorSetter(null);
        Response = (await Axios.Callback(...(Axios.Arguments || []))).data;
        if(Response.Status !== 'Success')
            throw new Error(Response.Message);
        (UpdateState.Callback !== undefined) && (UpdateState.Setter(UpdateState.Callback(Response)));
        Resolve(Response);
    }catch(Rejection){
        Setters.OnErrorSetter(ServerErrors[( 
            (Rejection?.response?.data?.Message) || (Rejection?.message || 'Unknown Error') 
        ).replaceAll(' ', '_').toUpperCase()]);
        Reject(Rejection);
    }
    return Response;
});

export const GenericRequestToBackend = ({
    Path,
    Method = 'GET',
    Body = {},
    Config = {},
    SendToken = false,
    ParseBodyCallback = (Body) => Body,
    Filter = {
        Fields: undefined,
        Paginate: {
            Page: undefined,
            Limit: undefined,
            Search: undefined
        }
    }
}) => {
    if(SendToken)
        Config.headers = { ...Config.headers, Authorization: `Bearer ${GetCurrentUserToken()}` };
    let FilterBuffer = '?';
    (Path.endsWith('/') && (Path = Path.slice(0, Path.length - 1)))
    const AppendParameter = (Parameter) =>
        (FilterBuffer += FilterBuffer === '?' ? Parameter : '&' + Parameter);
    // ! Sort = ['Price', 'Category']
    // ! FilterBuffer = '?Sort=Price,Category
    if(Filter.Sort !== undefined)
        FilterBuffer += 'Sort=' + Filter.Sort.join(',');
    // ! ReturnData => ['Category', 'Price', 'Name', 'Description', 'Author']
    // ! Fields => ['Name', 'Price', 'Author']
    // ! ReturnData => ['Name', 'Price', 'Author']
    if(Filter.Fields !== undefined)
        AppendParameter('Fields=' + Filter.Fields.join(','));
    // ! Pagination
    AppendParameter('Page=' + (Filter.Paginate.Page || 1) + '&Limit=' + Filter.Paginate.Limit);
    // ! Search Text
    if(Filter.Search !== undefined)
        AppendParameter('Search=' + Filter.Search);
    let Arguments = [`${Settings.Server}/api/v1/${Path + FilterBuffer}`];
    Method = Method.toLowerCase();
    if(['post', 'put', 'patch'].includes(Method))
        Arguments.push(ParseBodyCallback(Body));
    Arguments.push(Config);
    return Axios[Method](...Arguments);
};


export const CheckFormErrors = ({ States, Validator = undefined }) => {
    const Validation = Validations[Validator] || {};
    if(!Validation)
        return;
    const Buffer = Object.fromEntries(States.map((State) => [State.Identifier, undefined]));
    const FormValidations = {
        IsPort: NodeValidator.isPort,
        IsEmail: NodeValidator.isEmail,
        IsURL: NodeValidator.isURL
    };
    States.forEach((State) => {
        if(!State.Getter)
            return;
        const StateValidation = Validation[State.Identifier] || {};
        const StateLength = (State.LengthWithoutWhitespaces ? 
            State.Getter.replaceAll(' ', '') : State.Getter).length
        if(State.Validator && !State.Validator[0]())
            Buffer[State.Identifier] = State.Validator[1];
        else if(State.Validations)
            State.Validations.forEach((Verify) => 
                Object.keys(FormValidations).includes(Verify) && (
                    !(FormValidations[Verify](State.Getter)) && 
                        (Buffer[State.Identifier] = FormatString({
                            UnformattedString: State[`On${Verify}Error`],
                            Values: {
                                Value: State.Getter
                            }
                        }))
                    )
                );
        else if((StateLength < StateValidation.MinLength || 
                StateLength > StateValidation.MaxLength) && State.Getter !== '')
            Buffer[State.Identifier] = FormatString({
                UnformattedString: State.OnLengthError,
                Values: {
                    MaxLength: StateValidation.MaxLength,
                    MinLength: StateValidation.MinLength
                }
            });
        else if(Number.isInteger(State.Getter) && ((State.Getter < StateValidation.Min) 
                || (State.Getter > StateValidation.Max)))
            Buffer[State.Identifier] = FormatString({
                UnformattedString: State.OnLengthError,
                Values: {
                    Max: StateValidation.Max,
                    Min: StateValidation.Min
                }
            });
        else if(StateValidation.Enum && !StateValidation.Enum.includes(State.Getter.toLowerCase()))
            Buffer[State.Identifier] = FormatString({
                UnformattedString: State.OnEnumError,
                Values: {
                    Enums: StateValidation.Enum.join(' ')
                }
            });
        else if(State.CompareWith !== State.Getter)
            Buffer[State.Identifier] = State.OnCompareError;
        else
            Buffer[State.Identifier] = undefined;
    });
    return Buffer;
};

export const SetTitle = (Title) => 
    document.title = Title + ' - Centro General de Alumnos, Salesianos Talca.';