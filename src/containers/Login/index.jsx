import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import Logo from '../../assets/logo.svg';
import { Button } from '../../components/Button';
import { useUser } from '../../hooks/UserContext';
import { api } from '../../services/api';

import {
  Container,
  Form,
  InputContainer,
  LeftContainer,
  Link,
  RightContainer,
  Title,
} from './styles';

export function Login() {
  const navigate = useNavigate();
  const { putUserData } = useUser();
  const schema = yup
    .object({
      email: yup
        .string()
        .email('Digite um e-mail válido')
        .required('O E-mail é obrigatório'),
      password: yup
        .string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .required('A senha é obrigatória'),
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
      const response = await api.post('/session', {
        email: data.email,
        password: data.password,
      });

      putUserData(response.data);

      toast.success('Seja Bem-vindo(a)!', {
        autoClose: 2000,
        onClose: () => navigate('/'),
      });
      // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    } catch (error) {
      toast.error('Email ou senha incorretos');
    }
  };

  return (
    <div>
      <Container>
        <LeftContainer>
          <img src={Logo} alt="logo-devburger" />
        </LeftContainer>

        <RightContainer>
          <Title>
            Olá, seja bem-vindo ao <span>DevBurger!</span>
            <br />
            Acesse com seu <span>Login e senha.</span>
          </Title>

          <Form onSubmit={handleSubmit(onSubmit)}>
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

            <Button type="submit">Entrar</Button>
          </Form>
          <p>
            Não possui uma conta? <Link to="/cadastro">Clique aqui.</Link>
          </p>
        </RightContainer>
      </Container>
    </div>
  );
}
