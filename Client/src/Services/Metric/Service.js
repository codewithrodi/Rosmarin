import { GenericRequestToBackend } from '../../Utilities/Runtime';

export const GenerateReport = (Body) =>
    GenericRequestToBackend({
        Path: 'metric/',
        Method: 'POST',
        Body
    });

export const GetAllReports = () =>
    GenericRequestToBackend({
        Path: 'metric/',
        Method: 'GET',
        SendToken: true
    });