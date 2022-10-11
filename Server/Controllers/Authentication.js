const JWT = require('jsonwebtoken');
const Crypto = require('crypto');
const User = require('../Models/User');
const { RuntimeError, CatchAsync, SendEmail } = require('../Utilities/Runtime');

const SignToken = (Identifier) =>
    JWT.sign({ id: Identifier }, process.env.SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRATION_DAYS
    });

const CreateAndSendToken = (Response, StatusCode, User) => {
    const Token = SignToken(User._id);
    User.Password = undefined;
    User.__v = undefined;
    Response.status(StatusCode).json({
        Status: 'Success',
        Token,
        Data: User
    });
};

exports.SignUp = CatchAsync(async (Request, Response) => {
    const { Username, Email, Password, PasswordConfirm } = Request.body;
    const NewUser = await User.create({
        Username,
        Email,
        Password,
        PasswordConfirm
    });
    SendEmail({
        Email: NewUser.Email,
        Subject: `¡Bienvenido ${NewUser.Username}!`,
        Data: 'Gracias por registrarte en nuestra plataforma (www.cgacest.com)'
    });
    CreateAndSendToken(Response, 201, NewUser);
});

exports.SignIn = CatchAsync(async (Request, Response, Next) => {
    const { Username, Password } = Request.body;
    if(!Username || !Password)
        return Next(new RuntimeError('AUTH_USERNAME_AND_PASSWORD_NOT_PROVIDED', 400));
    const RequestedUser = await User.findOne({ Username }).select('+Password');
    if(!RequestedUser || !(await RequestedUser.IsCorrectPassword(Password, RequestedUser.Password)))
        return Next(new RuntimeError('AUTH_INVALID_CREDENTIALS', 401));
    SendEmail({
        Email: RequestedUser.Email,
        Subject: 'Se ha detectado un nuevo inicio de sesión en tu cuenta, ¿Eres tu?',
        Message: `${RequestedUser.Username}, se ha iniciado sesion dentro de un nuevo dispositivo...`
    });
    CreateAndSendToken(Response, 200, RequestedUser);
});

exports.ForgotPassword = CatchAsync(async (Request, Response, Next) => {
    const RequestedUser = await User.findOne({
        Username: Request.body.Username
    });
    if(!RequestedUser)
        return Next(new RuntimeError('AUTH_USER_NOT_FOUND', 404));
    const ResetToken = RequestedUser.CreatePasswordResetToken();
    await RequestedUser.save({ validateBeforeSave: false });
    const ResetURL = `${process.env.CLIENT_HOST}/auth/reset-password/${ResetToken}/`;
    const Message = `Hola ${RequestedUser.Username}, se ha solicitado un cambio de contraseña en su cuenta, es por eso que se envía un correo a (${RequestedUser.Email}), vaya a ${ResetURL} para restablecer su contraseña, ¡es más fácil de lo que piensa!`;
    try{
        await SendEmail({
            Email: RequestedUser.Email,
            Subject: 'Reestableciendo su contraseña',
            Message
        });
        Response.status(200).json({ Status: 'Success' });
    }catch(ServerError){
        RequestedUser.PasswordResetToken = undefined;
        RequestedUser.PasswordResetExpires = undefined;
        await RequestedUser.save({ validateBeforeSave: false });
        return Next(new RuntimeError('AUTH_FORGOT_PASSWORD_EMAIL_ERROR'));
    }
});

exports.ResetPassword = CatchAsync(async (Request, Response, Next) => {
    const HashedToken = Crypto.createHash('sha256').update(Request.params.Token).digest('hex');
    const RequestedUser = await User.findOne({
        PasswordResetToken: HashedToken,
        PasswordResetExpires: { $gt: Date.now() }
    });
    if(!RequestedUser)
        return Next(new RuntimeError('AUTH_INVALID_TOKEN', 400));
    RequestedUser.Password = Request.body.Password;
    RequestedUser.PasswordConfirm = Request.body.PasswordConfirm;
    RequestedUser.PasswordResetToken = undefined;
    RequestedUser.PasswordResetExpires = undefined;
    await RequestedUser.save();
    SendEmail({
        Email: RequestedUser.Email,
        Subject: 'Cambio de contraseña exitoso',
        Message: `Hola ${RequestedUser.Email}(${RequestedUser.Username}), Su solicitud para cambiar la contraseña de su cuenta se completó con éxito.`
    });
    CreateAndSendToken(Response, 200, RequestedUser);
});

exports.UpdateMyPassword = CatchAsync(async (Request, Response, Next) => {
    const RequestedUser = await User.findById(Request.User._id).select('+Password');
    if(!(await RequestedUser.IsCorrectPassword(Request.body.PasswordCurrent, RequestedUser.Password)))
        return Next(new RuntimeError('AUTH_CURRENT_PASSWORD_WRONG', 401));
    if(Request.body.PasswordCurrent === Request.body.Password)
        return Next(new RuntimeError('AUTH_NEW_PASSWORD_AND_OLD_PASSWORD_ARE_SAME', 401));
    RequestedUser.Password = Request.body.Password;
    RequestedUser.PasswordConfirm = Request.body.PasswordConfirm;
    await RequestedUser.save();
    SendEmail({
        Email: RequestedUser.Email,
        Subject: 'Alerta por cambio de contraseña...',
        Data: `Hola ${RequestedUser.Username}, estamos aqui para alertarte sobre un cambio de contraseña dentro de tu cuenta, ¿Fuiste tu?`
    });
    CreateAndSendToken(Response, 200, RequestedUser);
});