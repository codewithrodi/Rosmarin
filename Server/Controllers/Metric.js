const HandlerFactory = require('./HandlerFactory');
const Metric = require('../Models/Metric');

exports.GetAll = HandlerFactory.GetAll({ Model: Metric });

exports.GenerateReport = HandlerFactory.CreateOne({
    Model: Metric,
    // ! Request.MetricData from the Metric middleware
    ApplyFilter: (Request) => Request.MetricData
});