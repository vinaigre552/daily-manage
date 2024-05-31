import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const useInfo = createSlice({
  name: 'user',
  initialState: {
    id: 1,
    name: 'admin'
  },
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    }
  }
})

export const { setUsername } = useInfo.actions
export default useInfo.reducer