import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getCompanies } from '@/api/companies'
import { EQueryKeys } from '@/enums/query-keys.enum'
import { TPagination, TSorting } from '@/types/api.types'
import { TCompany } from '@/types/company.types'

type TProps = TPagination &
  TSorting & {
    allCompanies?: boolean
    options?: Partial<UseQueryOptions<[TCompany[], number]>>
  }

export const useCompanies = (props: TProps) => {
  const { options, ...allprops } = props

  return useQuery<[TCompany[], number]>({
    queryKey: [EQueryKeys.COMPANIES, allprops],
    queryFn: async () => {
      const response = await getCompanies(allprops)
      return response.data
    },
    staleTime: 5 * 60 * 1000,
    retry: true,
    ...options,
  })
}
