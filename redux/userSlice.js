import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    update: (state, action) => {
      state.info = action.payload
      // localStorage.setItem("user-music", JSON.stringify(state.info))
    },
  },
})

// Action creators are generated for each case reducer function
export const { update } = counterSlice.actions

export default counterSlice.reducer