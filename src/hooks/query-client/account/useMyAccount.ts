import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getMe } from '@/api/account'
import { TAccount } from '@/types/account.types'
import { EQueryKeys } from '@/enums/query-keys.enum'

export const useMyAccount = (options?: Partial<UseQueryOptions<TAccount>>) => {
  return useQuery<TAccount>({
    queryKey: [EQueryKeys.ME],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    retry: true,
    ...options,
  })
}
