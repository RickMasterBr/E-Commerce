import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const client = await clientPromise;
        const db = client.db("e_commerce_db");
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          // Retorna o objeto do usuário sem a senha
          return { id: user._id.toString(), name: user.name, email: user.email };
        } else {
          // Se as credenciais estiverem erradas
          return null;
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login', // Redireciona para a nossa página de login personalizada
  },
  callbacks: {
    // Adiciona o ID do usuário ao token da sessão
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Adiciona o ID do usuário ao objeto da sessão
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };