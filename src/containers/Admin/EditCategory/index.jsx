import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ImageIcon } from '@phosphor-icons/react';
import {
  Container,
  Form,
  InputGroup,
  Label,
  Input,
  LabelUpload,
  ErrorMessage,
  SubmitButton,
} from './styles';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const schema = yup.object({
  name: yup.string().required('Digite o nome da categoria'),
});

export function EditCategory() {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const category = state?.category;

  useEffect(() => {
    if (!category) {
      navigate('/admin/categorias');
      return;
    }

    // Mostra a imagem atual da categoria
    if (category?.url) {
      setPreview(category.url);
    }
  }, [category, navigate]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    if (!category) return;

    const categoryFormData = new FormData();
    categoryFormData.append('name', data.name);

    if (data.file && data.file.length > 0) {
      categoryFormData.append('file', data.file[0]);
    }

    await toast.promise(
      api.put(`/categories/${category.id}`, categoryFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
      {
        pending: 'Editando a categoria...',
        success: 'Categoria editada com sucesso!',
        error: 'Falha ao editar a categoria, tente novamente!',
      },
    );

    setTimeout(() => {
      navigate('/admin/categorias');
    }, 2000);
  };

  if (!category) {
    return null;
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>Nome</Label>
          <Input
            type="text"
            {...register('name')}
            defaultValue={category.name}
          />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <LabelUpload>
            <ImageIcon />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setPreview(imageUrl);
                  setValue('file', event.target.files);
                }
              }}
            />

            {preview ? (
              <img
                src={preview}
                alt="Pré-visualização da categoria"
                style={{
                  width: '100%',
                  maxHeight: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginTop: '8px',
                }}
              />
            ) : (
              'Upload da categoria'
            )}
          </LabelUpload>
          <ErrorMessage>{errors?.file?.message}</ErrorMessage>
        </InputGroup>

        <SubmitButton>Editar Categoria</SubmitButton>
      </Form>
    </Container>
  );
}

