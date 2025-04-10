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

export function Login() {
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
    const response = await toast.promise(
      api.post('/session', {
        email: data.email,
        password: data.password,
      }),
      {
        pending: 'Realizando login...',
        success: 'Seja bem-vindo(a) ao DevBurger!',
        error: 'Email ou senha incorretos',
      },
    );

    console.log(response);
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
            Não possui uma conta? <a>Clique aqui.</a>
          </p>
        </RightContainer>
      </Container>
    </div>
  );
}
