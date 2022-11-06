/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * For related information - https://github.com/CodeWithRodi/Rosmarin/
 *
 * Source code for Rosmarin, an open source platform designed for the general 
 * student center of the Salesian Institution in Talca, Chile.
 * 
 * (www.cgacest.com)
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 ****/

import React, { useContext, useState, useEffect } from 'react';
import { MetricContext } from '../../../Services/Metric/Context';
import { HandleMetricsDistribution } from '../../../Utilities/Metrics';
import OrderedMetricsView from '../../../Components/Admin/OrderedMetricsView';
import { SetTitle } from '../../../Utilities/Runtime';
import './Dashboard.css';

const DashboardPage = () => {
    const { GetAllReports, GetError: GetMetricError, SetError: SetMetricError } = useContext(MetricContext);
    const [GetIsLoading, SetIsLoading] = useState(true);
    const [GetIsComponentMounted, SetIsComponentMounted] = useState(true);
    const [GetDuplicatedReports, SetDuplicatedReports] = useState([]);
    const [GetUniqueReports, SetUniqueReports] = useState([]);

    useEffect(() => {
        SetTitle('Panel de Administración');
        SetIsLoading(true);
        GetAllReports()
            .then(({ Data }) => {
                if(!GetIsComponentMounted)
                    return;
                SetDuplicatedReports(HandleMetricsDistribution(Data));
                SetUniqueReports(HandleMetricsDistribution(Data, true));
            })
            .catch(() => SetMetricError('Se produjo un error al intentar cargar las métricas desde el servidor.'))
            .finally(() => (GetIsComponentMounted) && (SetIsLoading(false)));
        return () => {
            SetIsLoading(false);
            SetIsComponentMounted(false);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <main id='Dashboard-Main'>
            <section>
                <h1>Panel de Administración</h1>
                    {GetMetricError ? (
                    <p>{GetMetricError}</p>
                ) : (
                    <OrderedMetricsView
                        IsLoading={GetIsLoading}
                        DuplicatedReports={GetDuplicatedReports}
                        UniqueReports={GetUniqueReports} />
                )}
            </section>
        </main>
    );
};

export default DashboardPage;