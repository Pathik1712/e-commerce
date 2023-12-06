"use client"
import React, { useRef, useState } from "react"
import { Company } from "../../../../../user"
import css from "../style.module.scss"
import Logo from "@/components/svg/Logo"
import { Country, State, City } from "country-state-city"
import Image from "next/image"
import axios from "axios"
import toast from "react-hot-toast"
import GlobalLoader from "@/components/Loader/GlobalLoader"
import { register_company } from "@/lib/redux/user_slice"
import { useStoreselector } from "@/lib/redux/store"
import { useDispatch } from "react-redux"

interface data extends HTMLFormElement {
  company_name: { value: string; focus(): FocusEvent }
  company_number: { value: string }
  city: { value: string }
  address: { value: string }
}

const Utility = () => {
  const [country, set_country] = useState(""),
    [state, set_state] = useState(""),
    [image, set_image] = useState(""),
    [fetching, set_fetching] = useState(false),
    form = useRef<HTMLFormElement>(null),
    email = useStoreselector((staet) => staet.users.data.email),
    dispatch = useDispatch()

  const handle_image = async (url: string) => {
    set_fetching(true)
    try {
      const promise = axios.head(url)
      toast.promise(promise, {
        loading: "Loadin Image",
        error: "Enter Valid Url",
        success: "Your Logo is ready ",
      })
      const res = await promise
      const str: string = res.headers["content-type"]
      if (str.includes("image/")) {
        set_image(url)
      }
    } catch {
    } finally {
      set_fetching(false)
    }
  }

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault()
    set_fetching(true)
    const { company_name, company_number, city } = form.current as data
    if (!country) {
      toast.error("Must select country")
      set_fetching(false)
      return
    }
    if (!state) {
      if (State.getStatesOfCountry(country).length !== 0) {
        toast.error("Must select state")
        set_fetching(false)
        return
      }
    }
    if (!city.value) {
      if (City.getCitiesOfState(country, state).length !== 0) {
        toast.error("Must select city")
        set_fetching(false)
        return
      }
    }
    const obj: Company = {
      contact: company_number.value,
      company_name: company_name.value,
      company_logo: image,
      address: {
        city: city.value,
        state: State.getStateByCodeAndCountry(state, country)?.name!,
        country: Country.getCountryByCode(country) as unknown as string,
        mobile: company_number.value,
        name: company_name.value,
      },
    }
    try {
      const res: { alredy_exist: boolean } = await axios.post(
        "/api/user/comp/register",
        obj,
        {
          params: { email },
        }
      )
      if (res.alredy_exist) {
        toast.error("company with this name alredy exist")
        company_name.focus()
      } else {
        dispatch(register_company(obj))
      }
    } catch (e) {
      toast.error("some thing went wrong")
    } finally {
      set_fetching(false)
    }
  }
  return (
    <main className={css.utility}>
      <Logo />
      <form
        onSubmit={handle_submit}
        ref={form}
      >
        <div>
          <h2>Company Name:</h2>
          <input
            name="company_name"
            required
            type="text"
            placeholder="Company name"
          />
        </div>
        <div>
          <h2>phone number:</h2>
          <input
            name="company_number"
            required
            type="text"
            placeholder="Enter Phonenumber"
            inputMode="tel"
          />
        </div>
        <div>
          <h2>image link:</h2>
          <input
            disabled={fetching}
            required
            value={image}
            type="text"
            placeholder="Company logo"
            onChange={(e) => handle_image(e.target.value)}
          />
          {image && (
            <Image
              src={image}
              alt="not found"
              height={200}
              width={200}
            />
          )}
        </div>
        <div>
          <h2>country:</h2>
          <select
            value={country}
            onChange={(e) => set_country(e.target.value)}
          >
            <option
              key={0}
              value=""
              disabled
              hidden
            >
              Country:
            </option>
            {Country.getAllCountries().map((i, num) => (
              <option
                key={`country-${num + 1}`}
                value={i.isoCode}
              >
                {i.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h2>state:</h2>
          <select
            name=""
            value={state}
            onChange={(e) => {
              set_state(e.target.value)
            }}
          >
            <option
              key={0}
              value=""
              disabled
              hidden
            >
              State:
            </option>
            {State.getStatesOfCountry(country).map((i, num) => (
              <option
                key={`city-${num}`}
                value={i.isoCode}
              >
                {i.name}
              </option>
            ))}
            {State.getStatesOfCountry(country) && (
              <option
                disabled
                style={{ color: "whitesmoke" }}
              >
                None
              </option>
            )}
          </select>
        </div>
        <div>
          <h2>City:</h2>
          <select name="city">
            <option
              selected
              key={0}
              value=""
              disabled
              hidden
            >
              City:
            </option>
            {City.getCitiesOfState(country, state).map((i, num) => (
              <option
                key={`city-${num}`}
                value={i.name}
              >
                {i.name}
              </option>
            ))}
            {City.getCitiesOfState(country, state) && (
              <option
                disabled
                style={{ color: "whitesmoke" }}
              >
                None
              </option>
            )}
          </select>
        </div>
        <button
          type="submit"
          disabled={fetching}
        >
          {fetching ? <GlobalLoader /> : "Continue"}
        </button>
      </form>
    </main>
  )
}

export default Utility
