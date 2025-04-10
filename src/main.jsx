import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import { Login } from './containers/Login/index.jsx';
import GlobalStyle from './styles/globalStyles.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
    <GlobalStyle />
    <ToastContainer autoClose={2000} theme="colored" />
  </StrictMode>,
);
