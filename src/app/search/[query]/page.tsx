import { http } from "@/func/Api"
import css from "./style.module.scss"
import Card from "@/components/card/Card"
import { Suspense } from "react"
import SkeletonLoading from "./(components)/SkeletonLoading"
import SearchBar from "./(components)/SearchBar"
import { Item } from "../../../../user"
import { headers } from "next/headers"

type props = {
  params: { query: string }
}

const searchPage = async ({ params: { query } }: props) => {
  const url = headers().get("x-url")!
  const res: Item[] = (
    await http.get("item/search", {
      params: {
        search: query,
        sort: new URL(url).searchParams.get("sort") ?? null,
      },
    })
  ).data
  return (
    <main className={css.searchPage}>
      <SearchBar path={query} />
      <section>
        <Suspense fallback={<SkeletonLoading />}>
          {res.map((i, num) => (
            <Card
              id={i.id!}
              img={i.image[0]}
              item={i}
              mrp={i.mrp}
              price={i.price}
              rating={i.ratings}
              title={i.name}
              key={`search-page-${num}`}
            />
          ))}
        </Suspense>
      </section>
    </main>
  )
}

export default searchPage
