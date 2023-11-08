import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: { signIn: "/auth/login" },

  callbacks: { authorized: ({ token }) => token !== null },
  secret: process.env.NEXTAUTH_SECRET,
})

export const config = { matcher: ["/settings/:path*"] }
