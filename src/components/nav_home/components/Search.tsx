"use client"
import css from "../style.module.scss"
import Searchicon from "@/components/svg/Searchicon"

const Search = () => {
  return (
    <>
      <span className={css.searchicon}>
        <Searchicon color='white' />
      </span>
      <span className={css.searchbar}>
        <label
          htmlFor='search-bar'
          className={css.searchLabel}
        >
          <Searchicon color='gray' />
        </label>
        <input
          className={css.searchInput}
          type='text'
          id='search-bar'
          placeholder='Electronics,clothes...'
        />
      </span>
    </>
  )
}

export default Search
