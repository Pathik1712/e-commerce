"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { thunk } from "@/lib/redux/user_slice"
import { AppDispatch } from "@/lib/redux/store"
import { get_session, store_session } from "./presist"
import { useStoreselector } from "@/lib/redux/store"
import {persist_state} from '@/lib/redux/user_slice'

const ReduxData = () => {
  const user_data = useStoreselector((state) => state.users.data)
  const { status, data } = useSession()
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    if (status === "authenticated") {
      if (!get_session()) {
        dispatch(thunk(data.user?.email!))
      }
      else{
        dispatch(persist_state(get_session()))
      }
    }
  }, [status, dispatch, data])
  useEffect(()=>{
    if(user_data){
      store_session(JSON.stringify(user_data))
    }
  },[user_data])
  return <></>
}

export default ReduxData
