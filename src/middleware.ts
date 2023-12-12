import { withAuth } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"
import { redirect } from "next/navigation"

export default withAuth(
  function middleware(req: NextRequest) {
    const url_path = new URL(req.url).pathname
    if (url_path.startsWith("/search")) {
      let url_len = url_path.slice(1).split("/").length
      if (url_len <= 3) {
          return NextResponse.next({
            request: {
              headers: new Headers({ "x-url": req.url }),
            },
          })
      }
      else{
        redirect('/')
      }
    }
  },
  {
    pages: { signIn: "/auth/login" },

    callbacks: { authorized: ({ token }) => token !== null },
    secret: process.env.NEXTAUTH_SECRET,
  }
)

export const config = { matcher: ["/settings/:path*", "/search/:path*"] }
