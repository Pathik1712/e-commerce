import css from "../style.module.scss"
import Empty from "@/components/empty template/Empty"
import { useStoreselector } from "@/lib/redux/store"
import { useEffect } from "react"

const Orders = () => {
  const data = useStoreselector((state) => state.users.data.sold_items)
  return data?.length===0 ? (
    <Empty />
  ) : (
    <main className={css.orders}>hii</main>
  )
}

export default Orders
