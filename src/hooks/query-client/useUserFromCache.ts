import { useQueryClient } from '@tanstack/react-query'

import { TAccount } from '@/types/account.types'

export const useUserFromCache = () => {
  const queryClient = useQueryClient()
  return queryClient.getQueryData<TAccount>(['me'])
}
