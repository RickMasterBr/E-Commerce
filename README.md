# 🚀 E-Commerce Next.js - Premium Supplements Store

Um projeto full-stack moderno de e-commerce construído com Next.js 15, Tailwind CSS, MongoDB e NextAuth.js, otimizado para performance, SEO e experiência do usuário.

## ✨ Funcionalidades Principais

### 🛍️ **E-commerce Completo**
- **Catálogo de Produtos** com filtros avançados e paginação
- **Carrinho Dinâmico** com persistência local e sincronização com banco de dados
- **Sistema de Autenticação** seguro com NextAuth.js
- **Gestão de Pedidos** completa
- **Sistema de Reviews** e avaliações
- **Wishlist** personalizada

### 🎨 **UI/UX Moderna**
- **Design Responsivo** otimizado para todos os dispositivos
- **Animações Suaves** com Framer Motion
- **Loading States** elegantes com skeleton screens
- **Modais Interativos** com acessibilidade completa
- **Carousel de Produtos** com auto-play e controles
- **Tema Consistente** com variáveis CSS personalizadas

### ⚡ **Performance Otimizada**
- **Next.js 15** com App Router
- **Otimização de Imagens** com Next.js Image
- **Lazy Loading** e code splitting automático
- **Cache Inteligente** com revalidação
- **Bundle Optimization** com tree shaking
- **SEO Avançado** com metadata dinâmica

### 🔒 **Segurança e Confiabilidade**
- **Validação de Dados** em todas as APIs
- **Sanitização de Inputs** e proteção contra XSS
- **Autenticação Segura** com JWT
- **Rate Limiting** e proteção contra ataques
- **Error Handling** robusto

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca de UI
- **Tailwind CSS 4** - Framework CSS utilitário
- **Framer Motion** - Animações e transições
- **React Hot Toast** - Notificações elegantes
- **Class Variance Authority** - Sistema de variantes de componentes

### Backend
- **Next.js API Routes** - API serverless
- **MongoDB** - Banco de dados NoSQL
- **NextAuth.js** - Autenticação e autorização
- **bcryptjs** - Hash de senhas

### Ferramentas de Desenvolvimento
- **ESLint** - Linting de código
- **PostCSS** - Processamento CSS
- **TypeScript** - Tipagem estática (opcional)

## 🚀 Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- MongoDB (local ou Atlas)
- npm ou yarn

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/e-commerce.git
cd e-commerce
```

### 2. Instale as Dependências
```bash
npm install
# ou
yarn install
```

### 3. Configure as Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/e_commerce_db
# ou para MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/e_commerce_db

# NextAuth.js
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Site URL (para produção)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Google Analytics (opcional)
GOOGLE_SITE_VERIFICATION=your-verification-code
```

### 4. Execute o Projeto
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar em produção
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router (Next.js 15)
│   ├── api/               # API Routes
│   │   ├── auth/          # Autenticação
│   │   ├── produtos/      # CRUD de produtos
│   │   └── user/          # Dados do usuário
│   ├── admin/             # Painel administrativo
│   ├── shop/              # Loja e produtos
│   ├── cart/              # Carrinho de compras
│   ├── account/           # Área do usuário
│   └── layout.js          # Layout principal
├── components/            # Componentes reutilizáveis
│   ├── Button.js          # Botão com variantes
│   ├── Header.js          # Header responsivo
│   ├── ProductCard.js     # Card de produto
│   ├── ProductCarousel.js # Carousel otimizado
│   ├── Modal.js           # Modal acessível
│   └── ...
├── context/               # Contextos React
│   └── CartContext.js     # Contexto do carrinho
├── lib/                   # Utilitários
│   └── mongodb/           # Conexão MongoDB
└── models/                # Modelos de dados
    └── User.js            # Modelo de usuário
```

## 🎯 Funcionalidades Detalhadas

### 🔍 **Sistema de Busca e Filtros**
- Busca por nome e descrição
- Filtros por categoria
- Ordenação por preço, nome, data
- Paginação inteligente
- Debounce para performance

### 🛒 **Carrinho Inteligente**
- Persistência local para convidados
- Sincronização automática com banco
- Limite de quantidade (99 itens)
- Cálculo automático de totais
- Feedback visual em tempo real

### 👤 **Sistema de Usuários**
- Registro e login seguro
- Perfil personalizável
- Histórico de pedidos
- Endereços múltiplos
- Reviews e avaliações

### 📱 **Responsividade Completa**
- Mobile-first design
- Breakpoints otimizados
- Touch-friendly interfaces
- Performance em dispositivos móveis

### 🎨 **Design System**
- Variáveis CSS consistentes
- Sistema de cores harmonioso
- Tipografia escalável
- Componentes reutilizáveis
- Animações fluidas

## 🔧 Configurações Avançadas

### Otimização de Performance
```javascript
// next.config.mjs
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};
```

### SEO Otimizado
- Metadata dinâmica
- Open Graph tags
- Twitter Cards
- Structured data
- Sitemap automático

### Acessibilidade
- ARIA labels
- Keyboard navigation
- Focus management
- Screen reader support
- Color contrast compliance

## 🚀 Deploy

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Plataformas
- **Netlify**: Compatível com build estático
- **Railway**: Suporte completo a Node.js
- **DigitalOcean**: App Platform
- **AWS**: Amplify ou EC2

## 📊 Monitoramento e Analytics

### Performance
- Core Web Vitals
- Lighthouse scores
- Bundle analyzer
- Performance monitoring

### Analytics
- Google Analytics 4
- Custom event tracking
- User behavior analysis
- Conversion tracking

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

- **Issues**: [GitHub Issues](https://github.com/seu-usuario/e-commerce/issues)
- **Documentação**: [Wiki do Projeto](https://github.com/seu-usuario/e-commerce/wiki)
- **Email**: seu-email@exemplo.com

## 🙏 Agradecimentos

- Next.js team pelo framework incrível
- Vercel pela plataforma de deploy
- Tailwind CSS pela biblioteca de estilos
- MongoDB pela base de dados robusta

---

**Desenvolvido com ❤️ usando Next.js 15 e tecnologias modernas**
