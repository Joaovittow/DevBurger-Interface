import { createBrowserRouter } from 'react-router-dom';

import { Header } from '../components/Header';
import { Home } from '../containers/Home';
import { Login } from '../containers/Login';
import { Menu } from '../containers/Menu';
import { Register } from '../containers/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/cadastro',
    element: <Register />,
  },
  {
    path: '/cardapio',
    element: <Menu />,
  },
]);
