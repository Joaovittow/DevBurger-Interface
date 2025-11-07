import { Route, Routes } from 'react-router-dom';

import {
  Cart,
  Categories,
  Checkout,
  CompletePayment,
  EditCategory,
  EditProduct,
  Home,
  Login,
  Menu,
  NewCategory,
  NewProduct,
  Orders,
  Products,
  Register,
} from '../containers';
import { UserLayout } from '../layouts/UserLayout';
import { AdminLayout } from '../layouts/AdminLayout';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/cardapio" element={<Menu />} />
        <Route path="/carrinho" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/complete" element={<CompletePayment />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/pedidos" element={<Orders />} />
        <Route path="/admin/novo-produto" element={<NewProduct />} />
        <Route path="/admin/editar-produto" element={<EditProduct />} />
        <Route path="/admin/produtos" element={<Products />} />
        <Route path="/admin/categorias" element={<Categories />} />
        <Route path="/admin/nova-categoria" element={<NewCategory />} />
        <Route path="/admin/editar-categoria" element={<EditCategory />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Register />} />
    </Routes>
  );
}
