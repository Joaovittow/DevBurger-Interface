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
import { useState } from 'react';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  name: yup.string().required('Digite o nome da categoria'),
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

export function NewCategory() {
  const [fileName, setFileName] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const categoryFormData = new FormData();
    categoryFormData.append('name', data.name);
    categoryFormData.append('file', data.file[0]);

    await toast.promise(
      api.post('/categories', categoryFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
      {
        pending: 'Adicionando a categoria...',
        success: 'Categoria criada com sucesso!',
        error: 'Falha ao adicionar a categoria, tente novamente!',
      },
    );

    setTimeout(() => {
      navigate('/admin/categorias');
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
          <LabelUpload>
            <ImageIcon />
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(event) => {
                const file = event.target.files[0];
                if (file) {
                  const imageUrl = URL.createObjectURL(file);
                  setFileName(imageUrl);
                  setValue('file', event.target.files);
                } else {
                  setFileName(null);
                }
              }}
            />

            {fileName ? (
              <img
                src={fileName}
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

        <SubmitButton>Adicionar Categoria</SubmitButton>
      </Form>
    </Container>
  );
}

