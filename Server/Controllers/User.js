const User = require('../Models/User');
const HandlerFactory = require('./HandlerFactory');
const { CatchAsync, FilterObject, RuntimeError, FormatString } = require('../Utilities/Runtime');

exports.GetUser = HandlerFactory.GetOne({ Model: User });
exports.GetAllUsers = HandlerFactory.GetAll({ Model: User });
exports.DeleteUser = HandlerFactory.DeleteOne({ Model: User });

exports.UpdateUser = HandlerFactory.UpdateOne({
    Model: User,
    FilterRequestFields: ['Username', 'Email', 'Role']
});

exports.DeleteMe = CatchAsync(async (Request, Response) => {
    const RequestedUser = await User.findByIdAndDelete(Request.User._id);
    Response.status(200).json({
        Status: 'Success',
        Data: RequestedUser
    });
});

exports.UpdateMe = CatchAsync(async (Request, Response) => {
    const FilteredBody = FilterObject(Request.body, 'Username', 'Email', 'Role');
    const RequestedUser = await User.findByIdAndUpdate(Request.User._id, FilteredBody, {
        new: true,
        runValidators: true
    });
    Response.status(200).json({
        Status: 'Success',
        Data: RequestedUser
    });
}); 