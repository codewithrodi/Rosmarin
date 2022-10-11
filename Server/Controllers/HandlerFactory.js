const APIFeatures = require('../Utilities/APIFeatures');
const { CatchAsync, RuntimeError, FilterObject } = require('../Utilities/Runtime');

exports.DeleteOne = ({ Model, ApplyIdentifier = undefined }) =>
    CatchAsync(async (Request, Response, Next) => {
        let Identifier = Request.params.Identifier;
        if(ApplyIdentifier !== undefined) 
            Identifier = ApplyIdentifier(Request);
        const RequestedDatabaseRecord = await Model.findByIdAndDelete(Identifier);
        if(!RequestedDatabaseRecord) 
            return Next(new RuntimeError('INVALID_RECORD_ID', 404));
        Response.status(200).json({
            Status: 'Success',
            Data: RequestedDatabaseRecord
        });
    });

exports.UpdateOne = ({ Model, FilterRequestFields = [], ApplyIdentifier = undefined, AdditionalFields = () => ({}) }) =>
    CatchAsync(async (Request, Response, Next) => {
        let Identifier = Request.params.Identifier;
        if(ApplyIdentifier !== undefined) 
            Identifier = ApplyIdentifier(Request);
        let FilteredBody = FilterObject(Request.body, ...FilterRequestFields);
        FilteredBody = { ...FilteredBody, ...AdditionalFields(Request) };
        const RequestedDatabaseRecord = await Model.findByIdAndUpdate(Identifier, FilteredBody, {
            new: true,
            runValidators: true
        });
        if(!RequestedDatabaseRecord) 
            return Next(new RuntimeError('INVALID_RECORD_ID', 404));
        Response.status(200).json({
            Status: 'Success',
            Data: RequestedDatabaseRecord
        });
    });

exports.CreateOne = ({ Model, FilterRequestFields = [], ApplyFilter = undefined }) =>
    CatchAsync(async (Request, Response) => {
        let FilteredBody = FilterObject(Request.body, ...FilterRequestFields);
        if(ApplyFilter !== undefined) 
            FilteredBody = { ...FilteredBody, ...ApplyFilter(Request) };
        const NewDatabaseRecord = await Model.create(FilteredBody);
        Response.status(201).json({
            Status: 'Success',
            Data: NewDatabaseRecord
        });
    });

exports.GetAll = ({ Model, ApplyFilter = undefined,  ApplyRecursion = [undefined, undefined] }) =>
    CatchAsync(async (Request, Response) => {
        const Resolve = CatchAsync(async () => {
            let Filter = {};
            if(ApplyFilter !== undefined) Filter = ApplyFilter(Request);
            const Features = await new APIFeatures({
                Query: Model.find(Filter),
                QueryString: Request.query,
                Model
            })
                .Filter()
                .Search()
                .Sort()
                .LimitFields()
                .Paginate();
            const Records = await Features.Query;
            const PaginatedResults = Records.length;
            const TotalResults = Request.query.Search
                ? (await Model.find(Model.searchBuilder(Request.query.Search))).length
                : (await Model.find(Filter)).length;
            return { Records, PaginatedResults, TotalResults };
        });
        let { PaginatedResults, TotalResults, Records } = await Resolve();
        if(typeof ApplyRecursion[0] !== undefined && typeof ApplyRecursion[1] === 'object')
            if(ApplyRecursion[0]({ Request, Database: { TotalResults, PaginatedResults, Records } })){
                ApplyFilter = () => ApplyRecursion[1];
                let { PaginatedResults, TotalResults, Records } = await Resolve();
            }
        Response.status(200).json({
            Status: 'Success',
            PaginatedResults,
            TotalResults,
            Data: Records
        });
    });

exports.GetOne = ({ Model, PopulateOptions = undefined, ApplyFilter = undefined, Method = 'findById' }) =>
    CatchAsync(async (Request, Response, Next) => {
        let FilteredBody = Request.params.Identifier;
        if(ApplyFilter !== undefined) 
            FilteredBody = { ...ApplyFilter(Request) };
        let Query = await Model[Method](FilteredBody);
        if(PopulateOptions != undefined) 
            Query = Query.populate(PopulateOptions);
        const RequestedDatabaseRecord = await Query;
        if(!RequestedDatabaseRecord) 
            return Next(new RuntimeError('INVALID_RECORD_ID', 404));
        Response.status(200).json({
            Status: 'Success',
            Data: RequestedDatabaseRecord
        });
    });
