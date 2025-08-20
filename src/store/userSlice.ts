import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { LoginUser, Nullable, UserInterface } from "@/interfaces"

const initialState: Nullable<LoginUser> = {
  name: null,
  email: null,
  picture: null,
  isLoggedIn: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserInterface>) => {
      const { name, email, picture } = action.payload

      state.name = name
      state.email = email
      state.picture = picture
      state.isLoggedIn = true
    },
    loginAsGuest: (state) => {
      state.name = "Guest"
      state.email = null
      state.picture = null
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.name = null
      state.email = null
      state.picture = null
      state.isLoggedIn = false
    }
  }
})

export const { login, loginAsGuest, logout } = userSlice.actions

export default userSlice.reducer