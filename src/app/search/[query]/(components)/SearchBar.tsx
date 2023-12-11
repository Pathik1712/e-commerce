import React from "react"
import Searchicon from "@/components/svg/Searchicon"
import Heart from "@/components/svg/Heart"
import Cartsvg from "@/components/svg/Cartsvg"
import css from "../style.module.scss"

const SearchBar = () => {
  return (
    <nav className={css.nav}>
      <form action="">
        <div>
          <input
            type="text"
            placeholder="Search Item ..."
          />
          <button type="submit">
            <Searchicon color="gray" />
          </button>
        </div>
        <span>
          <Cartsvg /> <Heart />
        </span>
      </form>
    </nav>
  )
}

export default SearchBar
