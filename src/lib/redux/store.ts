import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import user_slice from "./user_slice"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import logger from "redux-logger"

export const store = configureStore({
  reducer: {
    users: user_slice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useStoreselector: TypedUseSelectorHook<RootState> = useSelector
