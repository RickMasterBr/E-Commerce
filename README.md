FitFuel E-Commerce - Plataforma de Suplementos Desportivos
Este é um projeto full-stack de uma plataforma de e-commerce para a loja de suplementos desportivos "FitFuel". Construído com as mais recentes tecnologias web, o projeto apresenta um catálogo de produtos, gestão de conta de utilizador, carrinho de compras persistente e um fluxo de checkout completo.

🚀 Funcionalidades Implementadas
O projeto está estruturado com uma gama completa de funcionalidades essenciais para uma experiência de e-commerce moderna:

Gestão de Produtos (Admin):

Adicionar, editar e apagar produtos através de uma interface administrativa.

API RESTful para operações CRUD (Create, Read, Update, Delete) de produtos.

Navegação e Páginas Públicas:

Homepage: Com secção de destaque (Hero), categorias principais e produtos favoritos.

Página da Loja (/shop): Grelha com todos os produtos disponíveis no catálogo.

Página de Detalhes do Produto: Visualização individual de cada produto com informações detalhadas.

Páginas Estáticas: "Sobre Nós", "Blog/Comunidade" e "Fale Conosco" com formulário interativo.

Autenticação e Contas de Utilizador:

Sistema completo de registo e login de utilizadores com encriptação de palavras-passe.

Página para recuperação de palavra-passe.

Autenticação gerida de forma segura com NextAuth.js.

Área de Perfil do Utilizador (/account):

Layout unificado com menu lateral para uma navegação fácil.

Visão Geral (Overview): Painel com resumo dos pedidos recentes.

Configurações da Conta: Formulário para o utilizador atualizar os seus dados.

Gestão de Endereços: Visualização e gestão dos endereços de entrega.

Minhas Avaliações: Histórico de avaliações de produtos.

Funcionalidades de E-commerce:

Carrinho de Compras Persistente: O estado do carrinho é guardado no localStorage para visitantes e sincronizado com a base de dados para utilizadores autenticados.

Página do Carrinho (/cart): Permite visualizar e alterar a quantidade dos itens.

Fluxo de Checkout: Formulário completo para recolha de dados pessoais, endereço e método de pagamento.

Página de Confirmação de Pedido: Ecrã de sucesso após a finalização da compra.

Lista de Desejos (Wishlist): Página estática para visualização de itens guardados.

🛠️ Tecnologias Utilizadas
Framework: Next.js (com App Router)

Linguagem: JavaScript

Styling: Tailwind CSS

Base de Dados: MongoDB

Autenticação: NextAuth.js

Bibliotecas React:

react-hot-toast para notificações.

framer-motion para animações subtis.

bcryptjs para hashing de palavras-passe.

🏁 Como Começar
Siga os passos abaixo para executar o projeto localmente.

Pré-requisitos
Node.js (versão 18 ou superior)

MongoDB (uma instância local ou um cluster na nuvem como o MongoDB Atlas)

Instalação
Clone o repositório:

Bash

git clone <url-do-seu-repositorio>
cd <nome-do-repositorio>
Instale as dependências:

npm install
Configure as Variáveis de Ambiente

Execute o servidor de desenvolvimento:

Bash

npm run dev
Abra http://localhost:3000 no seu navegador para ver a aplicação.


🔌 API Endpoints
O projeto inclui um conjunto de APIs para gerir os dados:

Método	Rota	Descrição
GET	/api/produtos	Retorna todos os produtos.
POST	/api/produtos	Cria um novo produto (protegido).
GET	/api/produtos/[id]	Retorna um produto específico pelo seu ID.
PUT	/api/produtos/[id]	Atualiza um produto (protegido).
DELETE	/api/produtos/[id]	Apaga um produto (protegido).
POST	/api/auth/register	Regista um novo utilizador.
GET	/api/user/cart	Retorna o carrinho do utilizador autenticado.
POST	/api/user/cart	Atualiza o carrinho do utilizador autenticado.
GET	/api/user/orders	Retorna o histórico de pedidos do utilizador.
GET	/api/user/addresses	Retorna os endereços guardados do utilizador.

Exportar para as Planilhas
