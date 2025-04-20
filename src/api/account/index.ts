import { TAccount } from '@/types/account.types'

import { api } from '..'

const BASE_URL = 'account'

const getAllAccounts = async () => {
  api.get<TAccount[] | null>(`${BASE_URL}/all-accounts`)
}

const checkEmail = (email: string) => api.post(`${BASE_URL}/check-email`, { email })

const getMe = async () => {
  const { data } = await api.get<TAccount>(`${BASE_URL}/me`)
  return data
}

export { getAllAccounts, checkEmail, getMe }
