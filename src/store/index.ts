import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import scheduleReducer from './schedule'

const store = configureStore({
  reducer: {
    user: userReducer,
    schedule: scheduleReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store