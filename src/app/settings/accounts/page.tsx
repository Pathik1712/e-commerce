"use client"
import React, { useRef, useState } from "react"
import css from "../dashboard/style.module.scss"
import Logo from "@/components/svg/Logo"
import { Country, State, City } from "country-state-city"
import toast from "react-hot-toast"
import GlobalLoader from "@/components/Loader/GlobalLoader"
import { useStoreselector } from "@/lib/redux/store"
import { useDispatch } from "react-redux"
import LoadingPage from "@/components/loading/Loading_page"
import { react_toast_style } from "@/func/ReactToastStyle"
import { Address } from "../../../../user"
import Link from "next/link"
import { http } from "@/func/Api"
import { upsert_adderee } from "@/lib/redux/user_slice"

interface data extends HTMLFormElement {
  user_name: { value: string; focus(): FocusEvent }
  user_number: { value: string; focus(): FocusEvent }
  city: { value: string }
  user_address: { value: string }
  user_pincode: { value: string; focus(): FocusEvent }
}

const Account_page = () => {
  const [country, set_country] = useState(""),
    [state, set_state] = useState(""),
    [fetching, set_fetching] = useState(false),
    form = useRef<HTMLFormElement>(null),
    user_data = useStoreselector((staet) => staet.users.data),
    redux_loading = useStoreselector((state) => state.users.status),
    dispatch = useDispatch()

  const handle_submit = async (e: React.FormEvent) => {
    e.preventDefault()
    set_fetching(true)
    const number_regex = /^\d{10}$/
    const pincode_regex = /^\d{6}$/
    const { user_number, user_name, city, user_address, user_pincode } =
      form.current as data
    if (!country) {
      toast.error("Must select country", react_toast_style)
      set_fetching(false)
      return
    }
    if (!state) {
      if (State.getStatesOfCountry(country).length !== 0) {
        toast.error("Must select state", react_toast_style)
        set_fetching(false)
        return
      }
    }
    if (!city.value) {
      if (City.getCitiesOfState(country, state).length !== 0) {
        toast.error("Must select city", react_toast_style)
        set_fetching(false)
        return
      }
    }
    if (!number_regex.test(user_number.value)) {
      toast.error("enter valid phone number", react_toast_style)
      user_number.value = ""
      user_number.focus()
      set_fetching(false)
      return
    }
    if (!pincode_regex.test(user_pincode.value)) {
      toast.error("enter valid pincode", react_toast_style)
      user_pincode.value = ""
      user_pincode.focus()
      set_fetching(false)
      return
    }
    const obj: Address & { user_id: string } = {
      city: city.value,
      country: Country.getCountryByCode(country)?.name!,
      state: State.getStateByCodeAndCountry(state, country)?.name!,
      name: user_name.value,
      mobile: user_number.value,
      adress: user_address.value,
      pincode: user_pincode.value,
      user_id: user_data.id!,
      id:
        user_data?.adress?.length === 0
          ? ""
          : user_data?.adress && user_data.adress[0].pincode,
    }
    try {
      await http.put("user/create", obj)
      toast.success("data updated successfully", react_toast_style)
      dispatch(upsert_adderee(obj))
    } catch {
      toast.error("something went wrong please try again", react_toast_style)
    } finally {
      form.current?.reset()
      set_fetching(false)
    }
  }
  console.log(user_data?.adress)
  return redux_loading === "fetchin" ? (
    <LoadingPage />
  ) : (
    <main className={css.utility}>
      <Link
        href={"/"}
        style={{ display: "block", marginInline: "auto", paddingTop: "2rem" }}
      >
        <Logo />
      </Link>
      <form
        onSubmit={handle_submit}
        ref={form}
      >
        <div>
          <h2>User Name:</h2>
          <input
            name="user_name"
            defaultValue={user_data?.name}
            required
            type="text"
            placeholder="Company name"
          />
        </div>
        <div>
          <h2>phone number:</h2>
          <input
            name="user_number"
            defaultValue={user_data?.phone}
            required
            type="text"
            placeholder="Enter Phonenumber"
            inputMode="tel"
          />
        </div>
        <div>
          <h2>user email:</h2>
          <input
            name="user_email"
            value={user_data?.email}
            readOnly
            required
            type="text"
            placeholder="Company logo"
          />
        </div>
        <div>
          <h2>country:</h2>
          <select
            defaultValue={
              user_data?.adress?.length === 0
                ? ""
                : (user_data?.adress && user_data.adress[0].country)
            }
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
            defaultValue={
              user_data?.adress?.length === 0
                ? ""
                : user_data?.adress && user_data.adress[0].state
            }
            name=""
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
          <select
            name="city"
            defaultValue={
              user_data?.adress?.length === 0
                ? ""
                : user_data?.adress && user_data.adress[0].city
            }
          >
            <option
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
        <div>
          <h2>address</h2>
          <textarea
            required
            name="user_address"
            placeholder="Enter Adderess"
            defaultValue={
              user_data?.adress?.length === 0
                ? ""
                : user_data?.adress && user_data.adress[0].adress
            }
          ></textarea>
        </div>
        <div>
          <h2>pincode:</h2>
          <input
            name="user_pincode"
            defaultValue={
              user_data?.adress?.length === 0
                ? ""
                : user_data?.adress && user_data.adress[0].pincode
            }
            required
            type="text"
            inputMode="numeric"
            placeholder="Enter Pincode"
          />
        </div>
        <button
          type="submit"
          disabled={fetching}
        >
          {fetching ? <GlobalLoader /> : "Update"}
        </button>
      </form>
    </main>
  )
}

export default Account_page
