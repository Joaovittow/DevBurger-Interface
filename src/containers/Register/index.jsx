import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import Logo from '../../assets/logo.svg';
import { Button } from '../../components/Button';
import { api } from '../../services/api';

import {
  Container,
  Form,
  InputContainer,
  LeftContainer,
  RightContainer,
  Title,
} from './styles';

export function Register() {
  const schema = yup
    .object({
      name: yup.string().required('O nome é obrigatório'),
      email: yup
        .string()
        .email('Digite um e-mail válido')
        .required('O E-mail é obrigatório'),
      password: yup
        .string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .required('A senha é obrigatória'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais')
        .required('Confirme sua senha'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { status } = await api.post(
        '/users',
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          validateStatus: () => true,
        },
      );

      if (status === 200 || status === 201) {
        toast.success('Cadastro realizado com sucesso');
      } else if (status === 400) {
        toast.error('Email ja cadastrado! Faça login para continuar');
      } else {
        throw new Error();
      }
      // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    } catch (error) {
      toast.error('Falha no sistema! Tente novamente');
    }
  };

  return (
    <div>
      <Container>
        <LeftContainer>
          <img src={Logo} alt="logo-devburger" />
        </LeftContainer>

        <RightContainer>
          <Title>Criar conta</Title>

          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer>
              <label>Nome</label>
              <input type="text" {...register('name')} />
              <p>{errors.name?.message}</p>
            </InputContainer>

            <InputContainer>
              <label>E-mail</label>
              <input type="email" {...register('email')} />
              <p>{errors.email?.message}</p>
            </InputContainer>

            <InputContainer>
              <label>Senha</label>
              <input type="password" {...register('password')} />
              <p>{errors.password?.message}</p>
            </InputContainer>

            <InputContainer>
              <label>Confirme sua senha</label>
              <input type="password" {...register('confirmPassword')} />
              <p>{errors.confirmPassword?.message}</p>
            </InputContainer>

            <Button type="submit">Criar conta</Button>
          </Form>
          <p>
            Já possui uma conta? <a>Clique aqui.</a>
          </p>
        </RightContainer>
      </Container>
    </div>
  );
}
