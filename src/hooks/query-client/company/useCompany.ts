import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getCompany } from '@/api/companies'
import { EQueryKeys } from '@/enums/query-keys.enum'
import { TCompany } from '@/types/company.types'

type TProps = {
  id: number
  options?: Partial<UseQueryOptions<TCompany>>
}
const useCompany = (props: TProps) => {
  const { options, id } = props

  return useQuery<TCompany>({
    queryKey: [EQueryKeys.COMPANY, id],

    queryFn: async () => {
      const response = await getCompany(id)
      return response.data
    },
    staleTime: 5 * 60 * 1000,
    retry: true,
    ...options,
  })
}

export { useCompany }
