import css from "./page.module.scss"
import NavHome from "@/components/nav_home/NavHome"
import Card from "../components/card/Card"
import { http } from "@/func/Api"
import { Item } from "../../user"

export default async function Home() {
  const res = await http.get("item/all")
  const data: Item[] = res.data
  return (
    <main className={css.main}>
      <NavHome />
      <section>
        {data &&
          data.map((i, num) => (
            <Card
              img={i.image[0]}
              rating={i.ratings}
              title={i.name}
              price={i.price}
              mrp={i.mrp}
              key={num}
            />
          ))}
      </section>
    </main>
  )
}
