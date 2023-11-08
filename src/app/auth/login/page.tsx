"use client"
import css from "./style.module.scss"
import LoginBtn from "./(components)/LoginBtn"
import Logo from "@/components/svg/Logo"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Loader from "./(components)/Loader"
import { signIn, useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface body extends HTMLFormElement {
  Email: { value: string }
  Password: { value: string }
}

const Login = () => {
  const form = useRef<HTMLFormElement>(null),
    [fetch, set_fetch] = useState(false),
    router = useRouter()

  const { status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      router.refresh()
      toast.success("Welcome to shopease", {
        style: {
          backgroundColor: "rgba(0,0,0,0.7)",
          color: "white",
          fontWeight: "bold",
        },
      })
      router.replace("/")
    }
  }, [router, status])

  const handler = async (e: React.FormEvent) => {
    e.preventDefault()
    set_fetch(true)
    const body = form.current as body
    const data_obj = {
      email: body.Email.value,
      password: body.Password.value,
    }
    try {
      let res = await signIn("credentials", {
        ...data_obj,
        redirect: false,
      })
      if (!res?.ok) {
        toast.error("Enter Valid Email Or Password", {
          style: {
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            fontWeight: "bold",
          },
        })
        form.current?.reset()
      }
    } catch {
      toast.error("something went wrong")
    } finally {
      set_fetch(false)
    }
  }
  return (
    <>
      <main
        id='login'
        className={css.main}
      >
        <form
          onSubmit={handler}
          ref={form}
        >
          <Logo />
          <input
            autoComplete='email'
            required
            name='Email'
            type='email'
            placeholder='Email'
          />
          <input
            autoComplete='current-password'
            required
            name='Password'
            type='password'
            placeholder='Password'
          />
          <button
            disabled={fetch}
            type='submit'
            style={{ cursor: "pointer" }}
            className={css.log_btn}
          >
            {fetch ? <Loader /> : "Login"}
          </button>
          <span></span>
          <LoginBtn
            provider='google'
            fetch={fetch}
            set_fetch={set_fetch}
          />
          <LoginBtn
            provider='github'
            fetch={fetch}
            set_fetch={set_fetch}
          />
          <p>
            don&#39;t have account <Link href={"/auth/signin"}>Signin?</Link>
          </p>
        </form>
      </main>
    </>
  )
}

export default Login
