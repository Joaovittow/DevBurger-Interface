import { ListIcon, ListPlusIcon, ReceiptIcon, TagIcon, TagSimpleIcon } from '@phosphor-icons/react';

export const navLinks = [
  {
    id: 1,
    label: 'Pedidos',
    path: '/admin/pedidos',
    icon: <ReceiptIcon />,
  },
  {
    id: 2,
    label: 'Produtos',
    path: '/admin/produtos',
    icon: <ListIcon />,
  },
  {
    id: 3,
    label: 'Adicionar Produto',
    path: '/admin/novo-produto',
    icon: <ListPlusIcon />,
  },
  {
    id: 4,
    label: 'Categorias',
    path: '/admin/categorias',
    icon: <TagIcon />,
  },
  {
    id: 5,
    label: 'Adicionar Categoria',
    path: '/admin/nova-categoria',
    icon: <TagSimpleIcon />,
  },
];
