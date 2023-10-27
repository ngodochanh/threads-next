import prisma from '@/DB/db.config';
import { AuthOptions, ISODateString, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  username?: string | null;
};

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
          select: { id: true, name: true, email: true, username: true },
        });

        if (user) {
          return { ...user, id: user.id.toString() };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }: { session: CustomSession; token: JWT; user: User }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user = token.user as CustomUser;

      return session;
    },
  },
};
