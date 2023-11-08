"use client"
import { useStoreselector } from "@/lib/redux/store"

const Orders = () => {
  const data = useStoreselector((state) => state.users.data)
  return (
    <>
      <span>{JSON.stringify(data)}</span>
    </>
  )
}

export default Orders
