import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../features/reportSlice'

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
})