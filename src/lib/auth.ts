import { getServerSession } from "next-auth";
import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session?.user) {
        session.user.id = user.id; 
        session.user.email = user.email;
        session.user.createdAt = user.createdAt;
        session.user.updatedAt = user.updatedAt;
      }
      return session;
    },
  },
};

export async function auth() {
  return await getServerSession(authOptions);
}
