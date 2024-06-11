import prisma from "@/lib/prisma";
import { excludeFields } from "@/lib/utils";
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials): Promise<null | User> {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const userFound = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials?.email },
              { username: credentials?.email },
            ],
          },
        });

        if (!userFound) {
          return null;
        }

        const passwordMatch = await compare(
          credentials?.password,
          userFound.password,
        );

        if (!passwordMatch) {
          return null;
        }

        return userFound;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }: any) {
      return user.isActivated;
    },
    async session({ session, token }: any) {
      const user = await prisma.user.findUnique({
        where: { id: token.sub },
      });

      if (!user) {
        return null;
      }

      const userWithoutPassword = excludeFields(user, ["password"]);

      const newSession = {
        ...session,
        user: {
          ...session?.user,
          ...userWithoutPassword,
        },
      };

      return newSession;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
