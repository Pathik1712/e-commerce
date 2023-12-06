'use client'
import React from "react"
import { useStoreselector } from "@/lib/redux/store"
import Loading from "@/components/loading/Loading_page"
import Empty from "@/components/empty template/Empty"
import css from './style.module.scss'
import { useRouter } from "next/navigation"
import Heart from "@/components/svg/Heart"

const WhishList = () => {
  const router = useRouter()
  const data = useStoreselector((state) => state.users.data?.whishlist)
  if (useStoreselector((state) => state.users.status) === "fetchin") {
    return <Loading />
  }
  return (
    <main className={css.whishlist_page}>
      <nav>
        <button onClick={() => router.back()}>{"<"}</button>
        Whishlist
        <Heart/>
      </nav>
      {data?.length === 0 ? <Empty /> : ""}
    </main>
  )
}

export default WhishList
