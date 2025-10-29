import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import { BrowserRouter } from 'react-router-dom';

import { Elements } from '@stripe/react-stripe-js';
import { ThemeProvider } from 'styled-components';
import stripePromise from './config/stripeConfig.js';
import AppProvider from './hooks/index.jsx';
import { Router } from './routes';
import GlobalStyle from './styles/globalStyles.js';
import { standardTheme } from './styles/themes/standard.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={standardTheme}>
      <AppProvider>
        <Elements stripe={stripePromise}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Elements>
        <GlobalStyle />
        <ToastContainer autoClose={2000} theme="colored" />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
);
