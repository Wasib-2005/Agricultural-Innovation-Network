import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,     // to store weather API response
  loading: false, // for loading state
  error: null,    // to handle errors
}

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchWeatherSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload
    },
    fetchWeatherFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export const { fetchWeatherStart, fetchWeatherSuccess, fetchWeatherFailure } =
  weatherSlice.actions

export default weatherSlice.reducer
