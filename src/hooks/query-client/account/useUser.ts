import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getAccount } from '@/api/account'
import { EQueryKeys } from '@/enums/query-keys.enum'
import { TAccount } from '@/types/account.types'

type TProps = {
  id: number
  options?: Partial<UseQueryOptions<TAccount>>
}

const useUser = (props: TProps) => {
  const { options, id } = props

  return useQuery<TAccount>({
    queryKey: [EQueryKeys.USER, id],
    queryFn: async () => {
      const response = await getAccount(id)
      return response
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
    ...options,
  })
}

export { useUser }
