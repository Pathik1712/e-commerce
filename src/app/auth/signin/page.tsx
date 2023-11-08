"use client"

import css from "../login/style.module.scss"
import Logo from "@/components/svg/Logo"
import Link from "next/link"
import axios from "axios"
import { useRef, useState, useEffect } from "react"
import toast from "react-hot-toast"
import { signIn, useSession } from "next-auth/react"
import Loader from "../login/(components)/Loader"
import { useRouter } from "next/navigation"

interface form_data extends HTMLFormElement {
  Email: { value: string }
  Password: { value: string; focus(): React.FocusEvent }
  Phone: { value: string; focus(): React.FocusEvent }
  Username: { value: string }
}
const Signin = () => {
  const form = useRef<HTMLFormElement>(null),
    [fetch, set_fetch] = useState(false)
  const router = useRouter()

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

  const regex = (regex_data: form_data): boolean => {
    const password_regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/
    const phone_regex = /^[6-9][0-9]+[0-9]$/
    let valid = password_regex.test(regex_data.Password.value)
    if (!valid) {
      toast.error("Please Enter Strong Password")
      regex_data.Password.value = ""
      regex_data.Password.focus()
      return false
    }
    const check = phone_regex.test(regex_data.Phone.value)
    if (!check) {
      toast.error("Enter Valid Phone Number")
      regex_data.Phone.value = ""
      regex_data.Phone.focus()
      return false
    }
    return true
  }
  const handler = async (e: React.FormEvent) => {
    e.preventDefault()
    set_fetch(true)
    let data = form.current as form_data
    let valid = regex(data)
    if (!valid) {
      set_fetch(false)
      return
    }
    const req_obj = {
      email: data.Email.value,
      phone: data.Phone.value,
      password: data.Password.value,
      username: data.Username.value,
    }
    try {
      const res = await axios.post("/api/user/create", req_obj)
      if (!res.data) {
        console.log(res.data)
        toast.error("User with this email alredy exist")
      } else {
        const succes = await signIn("credentials", {
          ...req_obj,
          redirect: false,
        })
        if (succes) {
          router.replace("/")
        }
      }
    } catch (e) {
      toast.error("some thing went wrong")
    } finally {
      set_fetch(false)
    }
  }

  return (
    <>
      <main className={css.main}>
        <form
          onSubmit={handler}
          ref={form}
        >
          <Logo />
          <input
            autoComplete='username'
            style={{ marginTop: "auto" }}
            type='text'
            placeholder='Username'
            name='Username'
            required
          />
          <input
            autoComplete='email'
            type='email'
            placeholder='Email'
            name='Email'
            required
          />
          <input
            type='password'
            placeholder='Password'
            name='Password'
            required
          />
          <input
            autoComplete='tel'
            maxLength={10}
            minLength={10}
            type='tel'
            placeholder='Phone number'
            name='Phone'
            required
          />
          <button
            type='submit'
            className={css.log_btn}
            style={{ marginTop: "auto", cursor: "pointer" }}
            disabled={fetch}
          >
            {fetch ? <Loader /> : "Signin"}
          </button>
          <p>
            alredy have account <Link href={"/auth/login"}>Login</Link>
          </p>
        </form>
      </main>
    </>
  )
}

export default Signin
