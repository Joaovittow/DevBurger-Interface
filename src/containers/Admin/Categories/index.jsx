import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import {
  Container,
  CategoryImage,
  EditButton,
  DeleteButton,
  StyledTableHead,
} from './styles';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PencilIcon, TrashIcon } from '@phosphor-icons/react';

export function Categories() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');
      setCategories(data);
    }

    loadCategories();
  }, []);

  function editCategory(category) {
    navigate('/admin/editar-categoria', { state: { category } });
  }

  async function deleteCategory(categoryId) {
    if (window.confirm('Deseja realmente excluir esta categoria?')) {
      try {
        await toast.promise(
          api.delete(`/categories/${categoryId}`),
          {
            pending: 'Excluindo categoria...',
            success: 'Categoria excluída com sucesso!',
            error: 'Erro ao excluir categoria',
          }
        );

        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== categoryId)
        );
      } catch (error) {
        console.error('Erro ao excluir categoria:', error);
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
              <TableCell align="center">Imagem da categoria</TableCell>
              <TableCell align="center">Editar Categoria</TableCell>
              <TableCell align="center">Excluir Categoria</TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell align="center">
                  <CategoryImage src={category.url} />
                </TableCell>
                <TableCell align="center">
                  <EditButton onClick={() => editCategory(category)}>
                    <PencilIcon />
                  </EditButton>
                </TableCell>
                <TableCell align="center">
                  <DeleteButton onClick={() => deleteCategory(category.id)}>
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

