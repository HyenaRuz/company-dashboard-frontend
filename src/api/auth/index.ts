import { api } from '@/api'
import { getTokensFromLocalStorage } from '@/helpers/localstorage.helper'
import { TAccount } from '@/types/account.types'
import { TAuthResponse, TAuthTokens } from '@/types/auth.types'

const BASE_URL = 'auth'

const signup = async (formData: FormData): Promise<TAuthResponse> => {
  const { data } = await api.post<{ user: TAccount; tokens: TAuthTokens }>(
    `${BASE_URL}/signup`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
  return data
}

const login = async (payload: { login: string; password: string }): Promise<TAuthResponse> => {
  const { data } = await api.post<{ tokens: TAuthTokens; user: TAccount }>(
    `${BASE_URL}/login`,
    payload,
  )
  return data
}

const refreshTokens = async () => {
  const tokens = await getTokensFromLocalStorage()

  if (!tokens?.refreshToken) {
    throw new Error('No refresh token')
  }

  return api.get<{ accessToken: string }>(
    `${import.meta.env.VITE_API_BASE_URL}${BASE_URL}/check-email`,
    {
      headers: {
        Authorization: `Bearer ${tokens.refreshToken}`,
      },
    },
  )
}

const checkEmail = async (email: string) => await api.post(`${BASE_URL}/check-email`, { email })

const requestPasswordReset = async (email: string) =>
  await api.post(`${BASE_URL}/reset-password-request`, { email })

const resetPassword = async (token: string, newPassword: string, confirmPassword: string) =>
  await api.post(`${BASE_URL}/reset-password`, { token, newPassword, confirmPassword })

export { signup, login, refreshTokens, checkEmail, requestPasswordReset, resetPassword }
