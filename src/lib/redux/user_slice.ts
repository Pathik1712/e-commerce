import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { User_state, Company } from "../../../user"

export const thunk = createAsyncThunk("user_thunk", async (email: string) => {
  let res = await axios.get("/api/user/create", { params: { email } })
  return res.data
})
type initialState = {
  data: Partial<User_state>
  status: "idole" | "fetchin" | "rejected" | "sucess"
}

const user_sliece = createSlice({
  name: "users",
  initialState: {
    status: "idole",
  } as initialState,
  reducers: {
    register_company(state, { payload }) {
      const obj: Company = payload
      return {
        ...state,
        data: {
          ...state.data,
          type: "seller",
          company_detail: {
            ...obj,
          },
        },
      }
    },
    add_item(state,{payload}){
      state.data.items?.push(payload)
    }
  },
  extraReducers(builder) {
    builder.addCase(thunk.pending, (state, { payload }) => {
      state.status = "fetchin"
    })
    builder.addCase(thunk.fulfilled, (state, { payload }) => {
      state.data = payload
      state.status = "sucess"
    })
    builder.addCase(thunk.rejected, (state, { payload }) => {
      state.status = "rejected"
    })
  },
})

export const { register_company,add_item } = user_sliece.actions

export default user_sliece.reducer
