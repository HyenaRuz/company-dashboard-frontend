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

const getCompanies = async (params: TPagination & TSorting) =>
  api.get<[TCompany[], number]>(`${BASE_URL}${createQueryString(params)}`)

const updateCompany = async (id: number, payload: FormData) =>
  api.put<[TCompany[], number]>(`${BASE_URL}/${id}`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

const deleteCompany = (id: number) => api.delete(`${BASE_URL}/${id}`)

export { createCompany, getCompanies, deleteCompany, updateCompany }
