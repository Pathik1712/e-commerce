"use client"

import css from "../style.module.scss"
import Google from "@/components/svg/Google"
import Github from "@/components/svg/Github"
import { signIn } from "next-auth/react"

type Props = {
  provider: "google" | "github"
  fetch: boolean
  set_fetch: Function
}

const LoginBtn = ({ provider, fetch, set_fetch }: Props) => {
  const handler = async (option: Props["provider"]) => {
    set_fetch(true)
    const res = await signIn(option, { redirect: false })
  }

  return (
    <button
      type='button'
      className={css.provider}
      style={{ opacity: fetch ? "0.7" : "1" }}
      disabled={fetch}
      onClick={() => {
        handler(provider)
      }}
    >
      {provider === "google" ? <Google /> : <Github />}
      <span>continue with {provider}</span>
    </button>
  )
}

export default LoginBtn
