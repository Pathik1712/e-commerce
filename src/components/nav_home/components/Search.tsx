'use client'
import { useRouter } from "next/navigation"
import css from "../style.module.scss"
import Searchicon from "@/components/svg/Searchicon"

const Search = () => {
  const router=useRouter() 

  const handleSearch = async (e: FormData) => {
    const search = e.get("search")
    router.push(`search/${search}`)
  }

  return (
    <form action={handleSearch}>
      <span className={css.searchicon}>
        <Searchicon color="white" />
      </span>
      <span className={css.searchbar}>
        <label
          htmlFor="search-bar"
          className={css.searchLabel}
        >
          <Searchicon color="gray" />
        </label>
        <input
          name="search"
          className={css.searchInput}
          type="text"
          id="search-bar"
          placeholder="Electronics,clothes..."
        />
      </span>
    </form>
  )
}

export default Search
