// hooks/useUser.ts
import { useQuery } from '@tanstack/react-query'

import { getMe } from '@/api/account'
import { TAccount } from '@/types/account.types'

export const useUser = () => {
  return useQuery<TAccount>({
    queryKey: ['me'],
    queryFn: getMe,
    staleTime: 5 * 60 * 1000,
    retry: false,
  })
}
