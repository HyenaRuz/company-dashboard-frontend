import { useQueryClient } from '@tanstack/react-query'

import { EQueryKeys } from '@/enums/query-keys.enum'
import { TAccount } from '@/types/account.types'

const useUserFromCache = () => {
  const queryClient = useQueryClient()
  return queryClient.getQueryData<TAccount>([EQueryKeys.ME])
}

export { useUserFromCache }
