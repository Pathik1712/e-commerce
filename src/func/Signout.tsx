"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
import React from "react"

const Signout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Link
      href={"/"}
      onClick={() => signOut()}
    >
      {children}
    </Link>
  )
}

export default Signout
