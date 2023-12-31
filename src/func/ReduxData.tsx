"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { thunk } from "@/lib/redux/user_slice"
import { AppDispatch } from "@/lib/redux/store"

const ReduxData = () => {
  const { status, data } = useSession()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (status === "authenticated") {
      dispatch(thunk(data.user?.email!))
    }
  }, [status, dispatch, data?.user?.email])
  return <></>
}

export default ReduxData
