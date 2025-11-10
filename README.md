# 🍔 DevBurger Interface

Interface web moderna e responsiva para gerenciamento completo de uma hamburgueria, desenvolvida com React e Vite. Oferece uma experiência completa tanto para clientes quanto para administradores, com funcionalidades de autenticação, catálogo de produtos, carrinho de compras, checkout com Stripe e painel administrativo.

## 📋 Índice

- [Features](#-features)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Como Executar](#-como-executar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Rotas](#-rotas)
- [Integração com API](#-integração-com-api)
- [Autenticação](#-autenticação)
- [Contribuindo](#-contribuindo)

## ✨ Features

### 👤 Área do Cliente
- 🏠 **Página Inicial** - Banner de boas-vindas com carrosséis de categorias e ofertas
- 📋 **Cardápio** - Visualização completa de produtos organizados por categorias
- 🛒 **Carrinho de Compras** - Adicionar, remover e gerenciar produtos no carrinho
- 💳 **Checkout** - Processamento de pagamentos integrado com Stripe
- ✅ **Confirmação de Pedido** - Página de confirmação após pagamento

### 👨‍💼 Área Administrativa
- 📦 **Gerenciamento de Produtos** - CRUD completo de produtos com upload de imagens
- 📂 **Gerenciamento de Categorias** - CRUD completo de categorias com upload de imagens
- 📊 **Gerenciamento de Pedidos** - Visualização e atualização de status dos pedidos
- 🎯 **Produtos em Oferta** - Controle de produtos em promoção
- 🔒 **Controle de Acesso** - Acesso restrito apenas para administradores

### 🎨 Interface
- 🎨 **Design Moderno** - Interface limpa e intuitiva com Styled Components
- 📱 **Responsivo** - Layout adaptável para diferentes tamanhos de tela
- 🌈 **Tema Customizável** - Sistema de temas com Styled Components
- 🔔 **Notificações** - Feedback visual com React Toastify
- 🎯 **Validação de Formulários** - Validação robusta com React Hook Form e Yup

## 🛠️ Tecnologias

### Core
- **React** v18.3.1 - Biblioteca JavaScript para construção de interfaces
- **Vite** v6.0.1 - Build tool moderna e rápida
- **JavaScript (ES6+)** - Linguagem de programação

### Roteamento & Navegação
- **React Router DOM** v7.5.0 - Roteamento client-side
- **React Router** - Gerenciamento de rotas e navegação

### Estilização
- **Styled Components** v6.1.13 - CSS-in-JS para estilização componentizada
- **Material-UI (MUI)** v6.5.0 - Biblioteca de componentes React
- **Emotion** v11.14.0 - Biblioteca CSS-in-JS (usada pelo MUI)
- **Phosphor Icons** v2.1.10 - Biblioteca de ícones moderna

### Formulários & Validação
- **React Hook Form** v7.53.2 - Gerenciamento performático de formulários
- **Yup** v1.4.0 - Validação de schemas
- **@hookform/resolvers** v3.9.1 - Integração Yup com React Hook Form

### Integrações
- **Axios** v1.8.4 - Cliente HTTP para requisições à API
- **Stripe** v7.8.0 - Processamento de pagamentos
- **@stripe/react-stripe-js** v3.9.1 - Componentes React para Stripe

### UI/UX
- **React Multi Carousel** v2.8.6 - Carrossel responsivo para categorias e ofertas
- **React Toastify** v11.0.5 - Notificações toast elegantes
- **React Select** v5.10.2 - Componente de select customizável

### Desenvolvimento
- **@biomejs/biome** v1.9.4 - Linter e formatação de código
- **TypeScript Types** - Tipagens para React e React DOM

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** v18.0.0 ou superior
- **npm** ou **yarn** (gerenciador de pacotes)
- **DevBurger API** rodando localmente ou em um servidor (veja [DevBurger API](https://github.com/Joaovittow/DevBurger-API))

## 🚀 Instalação

1. **Clone o repositório**
```bash
git clone <url-do-repositório>
cd DevBurger-Interface
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure a API**

Certifique-se de que a [DevBurger API](https://github.com/Joaovittow/DevBurger-API) está configurada e rodando. Por padrão, a interface espera a API em `http://localhost:3001`.

## ⚙️ Configuração

### Configuração da API

A URL base da API está configurada em `src/services/api.js`. Para alterar a URL da API:

```javascript
// src/services/api.js
export const api = Axios.create({
  baseURL: 'http://localhost:3001', // Altere para a URL da sua API
});
```

### Configuração do Stripe

A chave pública do Stripe está configurada em `src/config/stripeConfig.js`. Para usar sua própria chave:

```javascript
// src/config/stripeConfig.js
const stripePromisse = loadStripe(
  'sua-chave-publica-stripe-aqui'
);
```

**Nota:** Em produção, considere usar variáveis de ambiente para armazenar essas configurações sensíveis.

### Variáveis de Ambiente (Recomendado)

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3001
VITE_STRIPE_PUBLIC_KEY=pk_test_sua-chave-stripe
```

E atualize os arquivos de configuração para usar essas variáveis:

```javascript
// src/services/api.js
export const api = Axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
});

// src/config/stripeConfig.js
const stripePromisse = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_...'
);
```

## ▶️ Como Executar

### Modo Desenvolvimento
```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta disponível).

### Build para Produção
```bash
npm run build
# ou
yarn build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Preview da Build
```bash
npm run preview
# ou
yarn preview
```

### Linting
```bash
npm run lint
# ou
yarn lint
```

## 🏗️ Estrutura do Projeto

```
DevBurger-Interface/
├── src/
│   ├── assets/                  # Imagens, SVGs e recursos estáticos
│   │   ├── background-login.svg
│   │   ├── banner-home.svg
│   │   ├── cart.svg
│   │   ├── logo.svg
│   │   └── ...
│   ├── components/              # Componentes reutilizáveis
│   │   ├── Button/
│   │   ├── CardProduct/
│   │   ├── CartButton/
│   │   ├── CartItems/
│   │   ├── CartResume/
│   │   ├── CategoriesCarousel/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── OffersCarousel/
│   │   ├── SideNavAdmin/
│   │   ├── Stripe/
│   │   │   └── CheckoutForm/
│   │   └── Table/
│   ├── config/                  # Configurações
│   │   └── stripeConfig.js      # Configuração do Stripe
│   ├── containers/              # Páginas/Containers
│   │   ├── Admin/               # Páginas administrativas
│   │   │   ├── Categories/
│   │   │   ├── EditCategory/
│   │   │   ├── EditProduct/
│   │   │   ├── NewCategory/
│   │   │   ├── NewProduct/
│   │   │   ├── Orders/
│   │   │   └── Products/
│   │   ├── Cart/                # Carrinho de compras
│   │   ├── Checkout/            # Checkout e pagamento
│   │   ├── CompletePayment/     # Confirmação de pedido
│   │   ├── Home/                # Página inicial
│   │   ├── Login/               # Login
│   │   ├── Menu/                # Cardápio
│   │   └── Register/            # Cadastro
│   ├── hooks/                   # Custom Hooks
│   │   ├── CartContext.jsx      # Context do carrinho
│   │   ├── UserContext.jsx      # Context do usuário
│   │   └── index.jsx            # Provider dos contexts
│   ├── layouts/                 # Layouts das páginas
│   │   ├── AdminLayout/         # Layout administrativo
│   │   └── UserLayout/          # Layout do usuário
│   ├── routes/                  # Configuração de rotas
│   │   └── index.jsx
│   ├── services/                # Serviços e APIs
│   │   └── api.js               # Configuração do Axios
│   ├── styles/                  # Estilos globais e temas
│   │   ├── globalStyles.js      # Estilos globais
│   │   └── themes/              # Temas da aplicação
│   │       └── standard.js      # Tema padrão
│   ├── utils/                   # Funções utilitárias
│   │   ├── formatDate.js        # Formatação de datas
│   │   └── formatPrice.js       # Formatação de preços
│   └── main.jsx                 # Ponto de entrada da aplicação
├── index.html                   # HTML principal
├── package.json                 # Dependências do projeto
└── README.md                    # Este arquivo
```

## 🛣️ Rotas

### Rotas Públicas
- `/` - Página inicial
- `/cardapio` - Cardápio de produtos
- `/carrinho` - Carrinho de compras
- `/login` - Página de login
- `/cadastro` - Página de cadastro

### Rotas Autenticadas
- `/checkout` - Checkout e pagamento
- `/complete` - Confirmação de pedido

### Rotas Administrativas
- `/admin/pedidos` - Gerenciamento de pedidos
- `/admin/produtos` - Lista de produtos
- `/admin/novo-produto` - Criar novo produto
- `/admin/editar-produto` - Editar produto
- `/admin/categorias` - Lista de categorias
- `/admin/nova-categoria` - Criar nova categoria
- `/admin/editar-categoria` - Editar categoria

## 🔗 Integração com API

Esta interface se conecta com a [DevBurger API](https://github.com/Joaovittow/DevBurger-API) para todas as operações de backend. A API fornece:

- **Autenticação** - Login e registro de usuários
- **Produtos** - CRUD de produtos
- **Categorias** - CRUD de categorias
- **Pedidos** - Criação e gerenciamento de pedidos
- **Pagamentos** - Integração com Stripe

### Endpoints Utilizados

- `POST /users` - Registro de usuário
- `POST /session` - Login
- `GET /products` - Listar produtos
- `POST /products` - Criar produto (admin)
- `PUT /products/:id` - Atualizar produto (admin)
- `DELETE /products/:id` - Deletar produto (admin)
- `GET /categories` - Listar categorias
- `POST /categories` - Criar categoria (admin)
- `PUT /categories/:id` - Atualizar categoria (admin)
- `DELETE /categories/:id` - Deletar categoria (admin)
- `GET /orders` - Listar pedidos
- `POST /orders` - Criar pedido
- `PUT /orders/:id` - Atualizar status do pedido (admin)
- `POST /create-payment-intent` - Criar intent de pagamento

Para mais detalhes sobre a API, consulte a [documentação da DevBurger API](https://github.com/Joaovittow/DevBurger-API).

## 🔐 Autenticação

A aplicação utiliza JWT (JSON Web Token) para autenticação. O token é armazenado no `localStorage` e incluído automaticamente em todas as requisições via interceptor do Axios.

### Fluxo de Autenticação

1. **Login/Registro** - Usuário faz login ou se registra
2. **Token JWT** - API retorna um token JWT
3. **Armazenamento** - Token é armazenado no `localStorage`
4. **Requisições** - Token é incluído automaticamente no header `Authorization: Bearer <token>`
5. **Proteção de Rotas** - Rotas administrativas verificam se o usuário é administrador

### Controle de Acesso

- **Usuários comuns** - Podem acessar páginas públicas e fazer pedidos
- **Administradores** - Podem acessar o painel administrativo e gerenciar produtos, categorias e pedidos

## 🎨 Componentes Principais

### Componentes de UI
- **Button** - Botão customizável
- **CardProduct** - Card de produto para exibição
- **CartButton** - Botão do carrinho com contador
- **CartItems** - Lista de itens do carrinho
- **CartResume** - Resumo do carrinho com total
- **CategoriesCarousel** - Carrossel de categorias
- **OffersCarousel** - Carrossel de produtos em oferta
- **Table** - Tabela reutilizável

### Componentes de Layout
- **Header** - Cabeçalho da aplicação
- **Footer** - Rodapé da aplicação
- **SideNavAdmin** - Navegação lateral do painel administrativo
- **UserLayout** - Layout para páginas do usuário
- **AdminLayout** - Layout para páginas administrativas

### Componentes de Integração
- **CheckoutForm** - Formulário de checkout com Stripe

## 🔧 Hooks Customizados

### CartContext
Gerencia o estado do carrinho de compras, incluindo adicionar, remover e atualizar produtos.

### UserContext
Gerencia o estado do usuário autenticado, incluindo informações do usuário e token JWT.

## 📝 Notas Importantes

- A API deve estar rodando antes de iniciar a interface
- O token JWT é armazenado no `localStorage` com a chave `devburger:userData`
- Rotas administrativas verificam se o usuário é administrador
- Imagens são exibidas através das URLs fornecidas pela API
- O Stripe está configurado para ambiente de teste (modo sandbox)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

### Como Contribuir

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 🔗 Links Relacionados

- [DevBurger API](https://github.com/Joaovittow/DevBurger-API) - Backend da aplicação
- [Documentação do React](https://react.dev/)
- [Documentação do Vite](https://vitejs.dev/)
- [Documentação do Stripe](https://stripe.com/docs)

---

**Desenvolvido com ❤️ por [Joaovittow](https://github.com/joaovittow)**