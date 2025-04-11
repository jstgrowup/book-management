import NextAuth, { User } from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { db } from "./database/drizzle";
import { users } from "./database/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";
export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }
        const foundUser = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1);
        if (!foundUser.length) {
          return null;
        }
        const isPasswordValid = await compare(
          credentials.password.toString(),
          foundUser[0].password
        );
        if (!isPasswordValid) return null;
        return {
          id: foundUser[0].id.toString(),
          email: foundUser[0].email,
          name: foundUser[0].fullName,
        } as User;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
});
