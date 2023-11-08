import NextAuth from "next-auth/next"
import Credentials from "next-auth/providers/credentials"
import Github, { GithubProfile } from "next-auth/providers/github"
import Google, { GoogleProfile } from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"

export const option: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_PASS!,
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          image: profile.picture,
          name: profile.name,
          email: profile.email,
        }
      },
    }),
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_PASS!,
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.login,
          image: profile.avatar_url,
          email: profile.email,
        }
      },
    }),

    Credentials({
      name: "credential",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: { email: credentials?.email },
        })
        if (!user) {
          return null
        }
        const authenticate = await bcrypt.compare(
          credentials?.password!,
          user.password!
        )
        if (!authenticate) {
          return null
        }
        const obj = {
          ...user,
          name: user.name,
        }
        return obj
      },
    }),
  ],
  jwt: {
    maxAge: 60 * 60 * 24 * 15,
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 15,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      return token
    },
    async session({ token, session }) {
      return session
    },
  },
  debug: process.env.NODE_ENV === "development",
}
const handler = NextAuth(option)

export { handler as GET, handler as POST }
