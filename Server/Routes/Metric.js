const Express = require('express');
const Router = Express.Router();
const MetricController = require('../Controllers/Metric');
const MetricMiddleware = require('../Middlewares/Metric');
const AuthenticationMiddleware = require('../Middlewares/Authentication');

Router.post('/', MetricMiddleware.ParseRequestData, MetricController.GenerateReport);

Router.use(AuthenticationMiddleware.Protect, AuthenticationMiddleware.RestrictTo('admin'));

Router.get('/', MetricController.GetAll);

module.exports = Router;