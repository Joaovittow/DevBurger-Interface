import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import {
  Container,
  ProductImage,
  EditButton,
  DeleteButton,
  StyledTableHead,
} from './styles';
import { formatPrice } from '../../../utils/formatPrice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';

export function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get('/products');

      setProducts(data);
    }

    loadProducts();
  }, []);

  function editProduct(product) {
    navigate('/admin/editar-produto', { state: { product } });
  }

  async function toggleOffer(productId, currentOffer) {
    const newOfferStatus = !currentOffer;

    try {
      await toast.promise(
        api.put(`/products/${productId}`, { offer: newOfferStatus }),
        {
          pending: 'Atualizando status de oferta...',
          success: 'Status de oferta atualizado com sucesso!',
          error: 'Erro ao atualizar status de oferta',
        },
      );

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, offer: newOfferStatus }
            : product,
        ),
      );
    } catch (error) {
      console.error('Erro ao atualizar status de oferta:', error);
    }
  }

  async function deleteProduct(productId) {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      try {
        await toast.promise(api.delete(`/products/${productId}`), {
          pending: 'Excluindo produto...',
          success: 'Produto excluído com sucesso!',
          error: 'Erro ao excluir produto',
        });

        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId),
        );
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
    }
  }

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <StyledTableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="center">Preço</TableCell>
              <TableCell align="center">Produto em oferta</TableCell>
              <TableCell align="center">Imagem do produto</TableCell>
              <TableCell align="center">Editar Produto</TableCell>
              <TableCell align="center">Excluir Produto</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="center">
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={product.offer || false}
                    onChange={() => toggleOffer(product.id, product.offer)}
                    color="success"
                  />
                </TableCell>
                <TableCell align="center">
                  <ProductImage src={product.url} />
                </TableCell>
                <TableCell align="center">
                  <EditButton onClick={() => editProduct(product)}>
                    <PencilIcon />
                  </EditButton>
                </TableCell>
                <TableCell align="center">
                  <DeleteButton onClick={() => deleteProduct(product.id)}>
                    <TrashIcon />
                  </DeleteButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
