import { EStorageKey } from '@/enums/storage-key.enum'
import { TAuthTokens } from '@/types/auth.types'

const getTokensFromLocalStorage = () => {
  const accessToken = localStorage.getItem(EStorageKey.ACCESS_TOKEN)
  const refreshToken = localStorage.getItem(EStorageKey.REFRESH_TOKEN)

  if (!accessToken || !refreshToken) return null

  return {
    accessToken,
    refreshToken,
  }
}

const setTokenToLocalStorage = (tokens: Partial<TAuthTokens>) => {
  if (tokens.accessToken) localStorage.setItem(EStorageKey.ACCESS_TOKEN, tokens.accessToken)
  if (tokens.refreshToken) localStorage.setItem(EStorageKey.REFRESH_TOKEN, tokens.refreshToken)
}

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem(EStorageKey.ACCESS_TOKEN)
  localStorage.removeItem(EStorageKey.REFRESH_TOKEN)
}

export { getTokensFromLocalStorage, setTokenToLocalStorage, removeTokenFromLocalStorage }
