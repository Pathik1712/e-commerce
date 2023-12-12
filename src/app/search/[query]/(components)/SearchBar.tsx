"use client"
import React, { useCallback, useState } from "react"
import Searchicon from "@/components/svg/Searchicon"
import Heart from "@/components/svg/Heart"
import Cartsvg from "@/components/svg/Cartsvg"
import css from "../style.module.scss"
import Fillter from "@/components/svg/Fillter"
import Sort from "@/components/svg/Sort"
import { useId } from "react"
import { useRouter, usePathname } from "next/navigation"

const SearchBar = ({ path }: { path: string }) => {
  const id = useId()
  const router = useRouter()
  const route_url = usePathname()

  const [value, setValue] = useState(path)

  const handleSort = useCallback(
    (sortType: "high" | "low" | "ratings") => {
      if (!route_url.includes(sortType)) {
        router.push(`/search/${path}?sort=${sortType}`)
        const elm = document.getElementById(id + "sort") as HTMLInputElement
        elm.checked = false
      }
    },
    [id, path, route_url, router]
  )

  return (
    <>
      <nav className={css.nav}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            router.push(`/search/${value}`)
          }}
        >
          <div>
            <input
              defaultValue={path}
              onChange={(e) => {
                setValue(e.target.value)
              }}
              type="text"
              placeholder="Search Item ..."
            />
            <button type="submit">
              <Searchicon color="gray" />
            </button>
          </div>
          <span>
            <Cartsvg />
            <span>
              <Heart />
            </span>
          </span>
        </form>
      </nav>
      <div className={css.fillter}>
        <section>
          <input
            type="checkbox"
            id={id + "sort"}
            defaultChecked={false}
          />
          <label htmlFor={id + "sort"}>
            <Sort />
            Sort
          </label>
          <div className={css.opt}>
            <button
              onClick={() => {
                handleSort("high")
              }}
            >
              high to low
            </button>
            <button
              onClick={() => {
                handleSort("low")
              }}
            >
              {" "}
              low to high{" "}
            </button>
            <button
              onClick={() => {
                handleSort("ratings")
              }}
            >
              ratings
            </button>
          </div>
        </section>
        <section>
          <input
            type="checkbox"
            id={id + "fillter"}
          />
          <label htmlFor={id + "fillter"}>
            <Fillter />
            Fillter
          </label>
        </section>
      </div>
    </>
  )
}

export default SearchBar
