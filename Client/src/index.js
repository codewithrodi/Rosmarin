import React from 'react';
import ReactDOM from 'react-dom/client';
import Application from './Application';
import ReportWebVitals from './ReportWebVitals';
import ScrollToTop from './Components/General/ScrollToTop';
import * as EvergreenUI from 'evergreen-ui';
import * as MaterialUI from '@mui/material/styles';
import * as ServiceWorkerRegistration from './ServiceWorkerRegistration';
import { MultiProvider } from 'react-pendulum';
import { BrowserRouter } from 'react-router-dom';
import { MergeObjectValues } from './Utilities/Algorithms';
import './Utilities/Patches';
import './Assets/StyleSheets/General.css';
import './Assets/StyleSheets/Form.css';

const MaterialTheme = MaterialUI.createTheme({
    palette: {
        primary: {
            main: '#000000'
        }
    }
});

const EvergreenTheme = MergeObjectValues(EvergreenUI.defaultTheme, { 
  colors: { 
      blue500: '#000000' 
  } 
});

ReactDOM.createRoot(document.getElementById('Document-Root'))
  .render(
      <MultiProvider
        providers={[
          <BrowserRouter />,
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