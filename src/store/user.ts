import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface user {
  id: number,
  name: string
}

export const useInfo = createSlice({
  name: 'user',
  initialState: {
    id: 0,
    name: 'admin'
  },
  reducers: {
    setCurrentUser: (state, action: PayloadAction<user>) => {
      state.name = action.payload.name
      state.id = action.payload.id
    }
  }
})

export const { setCurrentUser } = useInfo.actions
export default useInfo.reducer