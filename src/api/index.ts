import axios from 'axios'

import { getTokensFromLocalStorage, setTokenToLocalStorage } from '@/helpers/localstorage.helper'
import { useLogout } from '@/helpers/logout'

import { refreshTokens } from './auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: '*/*',
  },
})

api.interceptors.request.use((config) => {
  const tokens = getTokensFromLocalStorage()

  if (tokens?.accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const message = error.response?.data?.message || error.message

    if (error.response?.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true
        const refreshToken = getTokensFromLocalStorage()
        if (!refreshToken?.refreshToken) {
          return Promise.reject({ ...error, message: error.message })
        }

        try {
          const { data } = await refreshTokens()

          setTokenToLocalStorage(data)

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
          return api(originalRequest)
        } catch (err) {
          useLogout()
          window.location.href = '/login'
        }
      } else {
        useLogout()
      }
    }

    return Promise.reject({ ...error, message })
  },
)
export { api }
