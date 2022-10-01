import React from 'react';
import ReactDOM from 'react-dom/client';
import Application from './Application';
import ReportWebVitals from './ReportWebVitals';
import ScrollToTop from './Components/General/ScrollToTop';
import * as ServiceWorkerRegistration from './ServiceWorkerRegistration';
import { MultiProvider } from 'react-pendulum';
import { BrowserRouter } from 'react-router-dom';
import './Assets/StyleSheets/General.css';
import * as MaterialUI from '@mui/material/styles';

const MaterialTheme = MaterialUI.createTheme({
    palette: {
        primary: {
            main: '#000000'
        }
    }
});

ReactDOM.createRoot(document.getElementById('Document-Root'))
  .render(
      <MultiProvider
        providers={[
          <BrowserRouter />,
          <MaterialUI.ThemeProvider theme={MaterialTheme} />,
          <ScrollToTop />
        ]}
      >
        <Application />
      </MultiProvider>
  );

ServiceWorkerRegistration.unregister();

ReportWebVitals();