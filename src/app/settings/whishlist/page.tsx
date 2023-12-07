"use client"
import React from "react"
import { useStoreselector } from "@/lib/redux/store"
import Loading from "@/components/loading/Loading_page"
import Empty from "@/components/empty template/Empty"
import css from "./style.module.scss"
import { useRouter } from "next/navigation"
import Heart from "@/components/svg/Heart"
import Card from "@/components/card/Card"
import Link from "next/link"

const WhishList = () => {
  const router = useRouter()
  const data = useStoreselector((state) => state.users.data?.whishlist)
  if (useStoreselector((state) => state.users.status) === "fetchin") {
    return <Loading />
  }
  const addToCart = () => {
    return (
      <Link
        href={"/"}
        className={css.addToCart}
      >
        Add To Cart
      </Link>
    )
  }
  return (
    <main className={css.whishlist_page}>
      <nav>
        <button onClick={() => router.back()}>{"<"}</button>
        Whishlist
        <Heart />
      </nav>
      {data?.length === 0 ? (
        <Empty />
      ) : (
        <section>
          {data?.map((i, num) => (
            <Card
              id={i.id!}
              img={i.image[0]}
              item={i}
              mrp={i.mrp}
              price={i.price}
              rating={i.ratings}
              title={i.name}
              key={`whishlist-item-${num}`}
              Component={addToCart}
            />
          ))}
        </section>
      )}
    </main>
  )
}

export default WhishList
