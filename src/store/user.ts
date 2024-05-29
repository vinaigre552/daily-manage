import { createSlice } from "@reduxjs/toolkit";

export const useInfo = createSlice({
  name: 'user',
  initialState: {
    id: 1,
    name: 'admin'
  },
  reducers: {
    isAdmin: state => {
      state.id += 1
    }
  }
})

export const { isAdmin } = useInfo.actions
export default useInfo.reducer