import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getMe } from '@/api/account'
import { TAccount } from '@/types/account.types'

export const useUser = (options?: Partial<UseQueryOptions<TAccount>>) => {
  return useQuery<TAccount>({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    retry: true,
    ...options,
  })
}
