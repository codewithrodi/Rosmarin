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

import React, { useState, useEffect } from 'react';
import MetricsChart from '../MetricsChart';
import { Skeleton, Button } from '@mui/material';
import './OrderedMetricsView.css';

const OrderedMetricsView = ({ IsLoading, UniqueReports, DuplicatedReports }) => {
    const [GetShowUniqueVisits, SetShowUniqueVisits] = useState(true);
    const View = (
        <article id='Ordered-Metrics-View-Container'>
            {(IsLoading) ? (
                <div>
                    <Skeleton variant='rectangular' height={300} width={400} />
                </div>
            ) : (
                <>
                    <MetricsChart Metrics={GetShowUniqueVisits ? UniqueReports : DuplicatedReports} />
                    <div id='Ordered-Metrics-View-Button-Container'>
                        <Button
                            type='button'
                            onClick={() => SetShowUniqueVisits(!GetShowUniqueVisits)}
                        >{GetShowUniqueVisits ? 'Mostrar todas las métricas': 'Filtrar métricas por IP'}</Button>
                    </div>
                </>
            )}
        </article>
    );
    
    useEffect(() => {
        return () => {
            SetShowUniqueVisits(true);
        };
    }, []);

    return (
        <div id='Desktop-Metrics-Container'>
            {View}
        </div>
    );
};

export default OrderedMetricsView;