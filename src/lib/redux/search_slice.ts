import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Item } from "../../../user"
import { http } from "@/func/Api"

type search_interface = {
  data: Item[]
  status: "loding" | "success" | "rejected" | "idol"
}
const initialState: search_interface = {
  data: [],
  status: "idol",
}

export const getSearch = createAsyncThunk(
  "searchslice/getSearch",
  async (querry: string, { rejectWithValue }) => {
    try {
      const res = await http.get("item/search", { params: { search: querry } })
      return res.data
    } catch (e) {
      if (typeof e === "string") {
        return rejectWithValue(e.toUpperCase())
      } else if (e instanceof Error) {
        return rejectWithValue(e.message)
      }
    }
  }
)

const searchSlice = createSlice({
  name: "search_data",
  initialState,
  reducers: {
    setData(state, { payload }) {
      return {
        data: payload,
        status: "success",
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getSearch.pending, (state, { payload }) => {
      state.status = "loding"
    })
    builder.addCase(getSearch.rejected, (state) => {
      state.status = "rejected"
    })
    builder.addCase(getSearch.fulfilled, (state, { payload }) => {
      return {
        status: "success",
        data: payload,
      }
    })
  },
})

export const { setData } = searchSlice.actions

export default searchSlice.reducer
