
import NextAuth, { type NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./prisma"
import bcrypt from "bcrypt"

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({ where: { email: credentials.email } })
        if (!user?.hashedPassword) return null
        const valid = await bcrypt.compare(credentials.password, user.hashedPassword)
        return valid ? { id: user.id, email: user.email, name: user.name } : null
      }
    })
  ],
  pages: {
    signIn: "/login"
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
