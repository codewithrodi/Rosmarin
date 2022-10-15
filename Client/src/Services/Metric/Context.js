import React, { createContext, useContext, useEffect } from 'react';
import { GetIPv4, GetClientInformation } from '../../Utilities/Metrics';
import { MakeServerRequest } from '../../Utilities/Runtime';
import { CoreContext } from '../Core/Context';
import * as Service from './Service';

export const MetricContext = createContext();

export const MetricProvider = ({ children }) => {
    const { 
        GetError,
        SetError,
        GetMessage,
        SetMessage
    } = useContext(CoreContext);
    const Setters = { OnErrorSetter: SetError };

    const GetAllReports = () => MakeServerRequest({
        Setters,
        Axios: { Callback: Service.GetAllReports }
    });
    
    useEffect(() => {
        GetIPv4()
            .then((IPv4) => {
                const { Browser, OperatingSystem, Language } = GetClientInformation();
                MakeServerRequest({
                    Setters,
                    Axios: {
                        Callback: Service.GenerateReport,
                        Arguments: [{ IPv4, Browser, OperatingSystem, Language }]
                    }
                });
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <MetricContext.Provider
            value={{
                GetError,
                SetError,
                GetMessage,
                SetMessage,
                GetAllReports,
            }}
        >
            {children}
        </MetricContext.Provider>
    );
};