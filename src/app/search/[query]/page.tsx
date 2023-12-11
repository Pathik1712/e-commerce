import { http } from "@/func/Api"
import css from './style.module.scss'
import Card from "@/components/card/Card"
import { Suspense } from "react"
import SkeletonLoading from "./(components)/SkeletonLoading"
import SearchBar from "./(components)/SearchBar"

type props = {
  params: { query: string }
}

const searchPage = async ({ params: { query } }: props) => {
  const res = await http.get("item/search", { params: { search: query } })

  return (
    <main className={css.searchPage}>
      <SearchBar/>
      <Suspense fallback={<SkeletonLoading />}>
        <div>lllllllllllllll</div>
      </Suspense>
    </main>
  )
}

export default searchPage
