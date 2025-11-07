import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  Container,
  Form,
  InputGroup,
  Label,
  Input,
  LabelUpload,
  Select,
  ErrorMessage,
  ContainerCheckbox,
} from './styles';
import { SubmitButton } from './styles';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ImageIcon } from '@phosphor-icons/react';

const schema = yup.object({
  name: yup.string().required('Digite o nome do produto'),
  price: yup
    .number()
    .positive()
    .required('Digite o preço do produto')
    .typeError('Digite um valor válido'),
  category: yup.object().required('Escolha a categoria'),
  offer: yup.bool(),
  file: yup
    .mixed()
    .test(
      'required',
      'Escolha um arquivo',
      (value) => value && value.length > 0,
    )
    .test(
      'fileSize',
      'Carregue um arquivo até 5MB',
      (value) => value && value.length > 0 && value[0].size <= 500000,
    )
    .test(
      'type',
      'Carregue apenas PNG ou JPEG',
      (value) =>
        value &&
        value.length > 0 &&
        (value[0].type === 'image/jpeg' || value[0].type === 'image/png'),
    ),
});

export function NewProduct() {
  const [fileName, setFileName] = useState(null);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');
      setCategories(data);
    }
    loadCategories();
  }, []);

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
    productFormData.append('file', data.file[0]);
    productFormData.append('offer', data.offer);

    await toast.promise(
      api.post('/products', productFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
      {
        pending: 'Adicionando o produto...',
        success: 'Produto criado com sucesso!',
        error: 'Falha ao adicionar o produto, tente novamente!',
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
          <Input type="text" {...register('name')} />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Preço</Label>
          <Input type="number" {...register('price')} />
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
                setFileName(file?.name || null);
                setValue('file', event.target.files);
              }}
            />
            {fileName || 'Upload do produto'}
          </LabelUpload>
          <ErrorMessage>{errors?.file?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Categoria</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={categories}
                getOptionLabel={(category) => category.name}
                getOptionValue={(category) => category.id}
                placeholder="Categorias"
                menuPortalTarget={document.body}
              />
            )}
          />
          <ErrorMessage>{errors?.category?.message}</ErrorMessage>
        </InputGroup>
        <InputGroup>
          <ContainerCheckbox>
            <input type="checkbox" {...register('offer')} />
            <Label> Produto em oferta?</Label>
          </ContainerCheckbox>
        </InputGroup>
        <SubmitButton>Adicionar Produto</SubmitButton>
      </Form>
    </Container>
  );
}
