import { createQueryString } from '@/helpers/createQueryString'
import { TPagination, TSorting } from '@/types/api.types'
import { TCompany } from '@/types/company.types'

import { api } from '..'

const BASE_URL = 'company'

const createCompany = (payload: FormData) =>
  api.post(`${BASE_URL}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

const getCompanies = (params: TPagination & TSorting & { allCompanies: boolean }) =>
  api.get<[TCompany[], number]>(`${BASE_URL}${createQueryString(params)}`)

const getAllCompanies = (params: TPagination & TSorting & { allCompanies?: boolean }) =>
  api.get<[TCompany[], number]>(`${BASE_URL}/all${createQueryString(params)}`)

const updateCompany = async (id: number, payload: FormData | TCompany) =>
  api.put<TCompany>(`${BASE_URL}/${id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

const deleteCompany = async (id: number) => await api.delete(`${BASE_URL}/${id}`)

const recoverCompany = async (id: number) => await api.patch(`${BASE_URL}/${id}/recover`)

const getCompany = async (id: number) => await api.get<TCompany>(`${BASE_URL}/${id}`)

export {
  createCompany,
  getCompanies,
  deleteCompany,
  updateCompany,
  getAllCompanies,
  getCompany,
  recoverCompany,
}
