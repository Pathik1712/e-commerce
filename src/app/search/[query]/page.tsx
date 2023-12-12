import { http } from "@/func/Api"
import Card from "@/components/card/Card"
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
    <section>
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
    </section>
  )
}

export default searchPage
