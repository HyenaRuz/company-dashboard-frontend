import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { TAccount } from '@/types/account.types'
import { TAuthTokens } from '@/types/auth.types'

type AuthState = {
  user: TAccount | null
  tokens: TAuthTokens | null
  appLoaded: boolean
}

const initialState: AuthState = {
  user: null,
  tokens: null,
  appLoaded: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsAppLoaded: (state, { payload }: PayloadAction<boolean>) => {
      state.appLoaded = payload
    },
    setAuth(state, action: PayloadAction<{ user: TAccount; tokens: TAuthTokens }>) {
      state.user = action.payload.user
      state.tokens = action.payload.tokens
    },
    clearAuth(state) {
      state.user = null
      state.tokens = null
    },
  },
})

const { setAuth, clearAuth, setIsAppLoaded } = appSlice.actions

export { appSlice, setAuth, clearAuth, setIsAppLoaded }
