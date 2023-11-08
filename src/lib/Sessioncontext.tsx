"use client"
import { SessionProvider } from "next-auth/react"

type Props = { children: React.ReactNode }

const Sessioncontext = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default Sessioncontext
