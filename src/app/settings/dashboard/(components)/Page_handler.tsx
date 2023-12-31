"use client"
import Add_intem from "./(pages)/Add_intem"
import Dashnav from "./(pages)/Dashnav"
import Items from "./(pages)/Items"
import UpdateItems from "./(pages)/UpdateItems"
import Orders from "./(pages)/Orders"
import { useSearchParams } from "next/navigation"
import Chart from "./(pages)/Chart"

type props = {
  img: string
  name: string
}
type path_names = "items" | "charts" | "orders" | "update"

const Page_handler = ({ img, name }: props) => {
  const search = useSearchParams()
  const path = search.get("path") as path_names
  const page = () => {
    if (path === "items") {
      return <Items />
    } else if (path === "update") {
      return <UpdateItems id={search.get("id")} />
    } else if (path === "orders") {
      return <Orders />
    } else if (path === "charts") {
      return <Chart id={search.get("id")!} />
    }
  }
  return (
    <>
      <Dashnav
        img={img}
        name={name}
        location={path}
      />
      {!search.has("path") ? <Add_intem /> : page()}
    </>
  )
}

export default Page_handler
