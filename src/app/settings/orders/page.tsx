"use client"
import { useStoreselector } from "@/lib/redux/store"
import Loading from "@/components/loading/Loading_page"
import Empty from "@/components/empty template/Empty"
import css from "./style.module.scss"
import { useRouter } from "next/navigation"
import Order from "@/components/svg/Order"

const Orders = () => {
  const router = useRouter()
  const data = useStoreselector((state) => state.users.data?.orders)
  if (useStoreselector((state) => state.users.status) === "fetchin") {
    return <Loading />
  }

  return (
    <main className={css.ordre_page}>
      <nav>
        <button onClick={() => router.back()}>{"<"}</button>
        Orders
        <Order/>
      </nav>
      {data?.length === 0 ? <Empty /> : ""}
    </main>
  )
}

export default Orders
