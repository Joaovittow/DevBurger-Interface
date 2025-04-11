import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';

import { RouterProvider } from 'react-router-dom';

import { router } from './routes/index.jsx';
import GlobalStyle from './styles/globalStyles.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    <GlobalStyle />
    <ToastContainer autoClose={2000} theme="colored" />
  </StrictMode>,
);
