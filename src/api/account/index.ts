import { createQueryString } from '@/helpers/createQueryString'
import { TAccount, TChangePassword } from '@/types/account.types'
import { TPagination, TSorting } from '@/types/api.types'

import { api } from '..'

const BASE_URL = 'account'

const getAllAccounts = async () => {
  await api.get<TAccount[] | null>(`${BASE_URL}/all-accounts`)
}

const checkEmail = async (email: string) => await api.post(`${BASE_URL}/check-email`, { email })

const getMe = async () => {
  const { data } = await api.get<TAccount>(`${BASE_URL}`)
  return data
}
const getAccount = async (id: number) => {
  const { data } = await api.get<TAccount>(`${BASE_URL}/${id}`)
  return data
}

const updateAccount = async (payload: FormData) => {
  const { data } = await api.put<TAccount>(`${BASE_URL}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

const updateAccountAdmin = async (id: number, payload: FormData) => {
  const { data } = await api.put<TAccount>(`${BASE_URL}/admin/${id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return data
}

const deleteAccount = async (id: number) => {
  const { data } = await api.delete(`${BASE_URL}/${id}`)
  return data
}
const recoverAccount = async (id: number) => await api.patch(`${BASE_URL}/${id}/recover`)

const updateAccountPassword = async (payload: TChangePassword) => {
  await api.put(`${BASE_URL}/me/password`, payload)
}

const getAllUsers = async (
  params: TPagination & TSorting & { email?: string; username?: string; id?: number },
) => await api.get<[TAccount[], number]>(`${BASE_URL}/all-accounts${createQueryString(params)}`)

export {
  getAllAccounts,
  checkEmail,
  getMe,
  updateAccount,
  updateAccountPassword,
  getAllUsers,
  updateAccountAdmin,
  getAccount,
  deleteAccount,
  recoverAccount,
}
