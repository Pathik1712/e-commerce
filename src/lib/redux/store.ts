import { configureStore } from "@reduxjs/toolkit"
import user_slice from "./user_slice"
import { TypedUseSelectorHook, useSelector } from "react-redux"


export const store = configureStore({
  reducer: {
    users: user_slice,
  },
})



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useStoreselector: TypedUseSelectorHook<RootState> = useSelector
