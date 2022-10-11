exports.GetMe = (Request, Response, Next) => {
    Request.params.Identifier = Request.User._id;
    Next();
};