"use client"
import { useStoreselector } from "@/lib/redux/store"
import Utility from "./(components)/Utility"
import Loading from "./(components)/loading"
import { redirect } from "next/navigation"
import Page_handler from "./(components)/Page_handler"

const Dashboard = () => {
  const { data, status } = useStoreselector((state) => state.users)
  if (status === "fetchin" || status === "idole") {
    return <Loading />
  }
  if (status === "rejected") {
    redirect("/")
  }

  return (
    <>
      {data.type === "buyer" && <Utility />}
      {data.type !== "buyer" && (
        <Page_handler
          img={data.company_detail?.company_logo!}
          name={data.company_detail?.company_name!}
        />
      )}
    </>
  )
}

export default Dashboard
