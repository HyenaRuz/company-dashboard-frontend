import { TAccount } from './account.types'

type TAuthTokens = {
  accessToken: string
  refreshToken: string
}

type TAuthResponse = {
  tokens: TAuthTokens
  user: TAccount
}

export type { TAuthTokens, TAuthResponse }
