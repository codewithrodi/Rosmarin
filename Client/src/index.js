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

import React from 'react';
import ReactDOM from 'react-dom/client';
import Application from './Application';
import ReportWebVitals from './ReportWebVitals';
import SuccessAlert from './Components/General/SuccessAlert';
import ScrollToTop from './Components/General/ScrollToTop';
import * as EvergreenUI from 'evergreen-ui';
import * as MaterialUI from '@mui/material/styles';
import * as ServiceWorkerRegistration from './ServiceWorkerRegistration';
import { MultiProvider } from 'react-pendulum';
import { BrowserRouter } from 'react-router-dom';
import { MergeObjectValues } from './Utilities/Algorithms';
import { CoreProvider } from './Services/Core/Context';
import { AuthenticationProvider } from './Services/Authentication/Context';
import { MetricProvider } from './Services/Metric/Context';
import { Provider as AlertProvider } from 'react-alert'
import './Utilities/Patches';
import './Assets/StyleSheets/General.css';
import './Assets/StyleSheets/Form.css';

const MaterialTheme = MaterialUI.createTheme({
    palette: {
        primary: {
            main: '#000000'
        },
        secondary: {
            main: '#FFFFFF'
        }
    }
});

const EvergreenTheme = MergeObjectValues(EvergreenUI.defaultTheme, { 
  colors: { 
      blue500: '#000000' 
  } 
});

const AlertTemplate = ({ options }) => (
  (options.type === 'success') && (<SuccessAlert />)
);

ReactDOM.createRoot(document.getElementById('Document-Root'))
  .render(
      <MultiProvider
        providers={[
          <AlertProvider template={AlertTemplate} />,
          <BrowserRouter />,
          <CoreProvider />,
          <MetricProvider />,
          <AuthenticationProvider />,
          <MaterialUI.ThemeProvider theme={MaterialTheme} />,
          <EvergreenUI.ThemeProvider value={EvergreenTheme} />,
          <ScrollToTop />
        ]}
      >
        <Application />
      </MultiProvider>
  );

ServiceWorkerRegistration.unregister();

ReportWebVitals();