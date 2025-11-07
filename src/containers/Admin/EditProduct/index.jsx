import { Controller, useForm } from 'react-hook-form';
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
  Select,
  ErrorMessage,
  SubmitButton,
} from './styles';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const schema = yup.object({
  name: yup.string().required('Digite o nome do produto'),
  price: yup
    .number()
    .positive()
    .required('Digite o preço do produto')
    .typeError('Digite um valor válido'),
  category: yup.object().required('Escolha a categoria'),
});

export function EditProduct() {
  const [preview, setPreview] = useState(null);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();
  const {
    state: { product },
  } = useLocation();

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');
      setCategories(data);
    }
    loadCategories();

    // Mostra a imagem atual do produto
    if (product?.url) {
      setPreview(product.url);
    }
  }, [product]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const productFormData = new FormData();
    productFormData.append('name', data.name);
    productFormData.append('price', data.price * 100);
    productFormData.append('category_id', data.category.id);

    if (data.file && data.file.length > 0) {
      productFormData.append('file', data.file[0]);
    }

    await toast.promise(
      api.put(`/products/${product.id}`, productFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
      {
        pending: 'Editando o produto...',
        success: 'Produto editado com sucesso!',
        error: 'Falha ao editar o produto, tente novamente!',
      },
    );

    setTimeout(() => {
      navigate('/admin/produtos');
    }, 2000);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <Label>Nome</Label>
          <Input
            type="text"
            {...register('name')}
            defaultValue={product.name}
          />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Preço</Label>
          <Input
            type="number"
            {...register('price')}
            defaultValue={product.price / 100}
          />
          <ErrorMessage>{errors?.price?.message}</ErrorMessage>
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
                alt="Pré-visualização do produto"
                style={{
                  width: '100%',
                  maxHeight: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginTop: '8px',
                }}
              />
            ) : (
              'Upload do produto'
            )}
          </LabelUpload>
          <ErrorMessage>{errors?.file?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Categoria</Label>
          <Controller
            name="category"
            control={control}
            defaultValue={product.category}
            render={({ field }) => (
              <Select
                {...field}
                options={categories}
                getOptionLabel={(category) => category.name}
                getOptionValue={(category) => category.id}
                placeholder="Categorias"
                menuPortalTarget={document.body}
                defaultValue={product.category}
              />
            )}
          />
          <ErrorMessage>{errors?.category?.message}</ErrorMessage>
        </InputGroup>

        <SubmitButton>Editar Produto</SubmitButton>
      </Form>
    </Container>
  );
}
