const Express = require('express');
const Router = Express.Router();
const AuthMiddleware = require('../Middlewares/Authentication');
const AuthController = require('../Controllers/Authentication');
const UserController = require('../Controllers/User');
const UserMiddleware = require('../Middlewares/User');

Router.post('/sign-up/', AuthController.SignUp);
Router.post('/sign-in/', AuthController.SignIn);
Router.post('/forgot-password/', AuthController.ForgotPassword);
Router.patch('/reset-password/:Token/', AuthController.ResetPassword);

Router.use(AuthMiddleware.Protect);

Router.delete('/delete-me/', UserController.DeleteMe);
Router.patch('/update-my-password/', AuthController.UpdateMyPassword);
Router.patch('/update-me/', UserController.UpdateMe);
Router.get('/get-me/', UserMiddleware.GetMe, UserController.GetUser);

Router.use(AuthMiddleware.RestrictTo('Admin'));

Router.get('/get-users/', UserController.GetAllUsers);
Router.route('/with-user/:Identifier/')
    .get(UserController.GetUser)
    .patch(UserController.UpdateUser)
    .delete(UserController.DeleteUser);

module.exports = Router;