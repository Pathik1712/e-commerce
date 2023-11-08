"use client"
import Add_intem from "./(pages)/Add_intem"
import Dashnav from "./(pages)/Dashnav"
import { useSearchParams } from "next/navigation"

type props = {
  img: string
  name: string
}

const Page_handler = ({ img, name }: props) => {
  const search = useSearchParams()
  return (
    <>
      <Dashnav
        img={img}
        name={name}
      />
      {!search.has("path") ? <Add_intem /> : "kkkkkkkkkkkkk"}
    </>
  )
}

export default Page_handler
