import { createQueryString } from '@/helpers/createQueryString'
import { TPagination, TSorting } from '@/types/api.types'
import { TCompany } from '@/types/company.types'

import { api } from '..'

const BASE_URL = 'company'

const createCompany = (payload: FormData) =>
  api.post(`${BASE_URL}/create`, payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

const getCompanies = async (params: TPagination & TSorting) =>
  api.get<[TCompany[], number]>(`${BASE_URL}${createQueryString(params)}`)

export { createCompany, getCompanies }
