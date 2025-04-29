import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { getAllUsers } from '@/api/account'
import { EQueryKeys } from '@/enums/query-keys.enum'
import { TAccount } from '@/types/account.types'
import { TPagination, TSorting } from '@/types/api.types'

type TProps = TPagination &
  TSorting & {
    email?: string
    username?: string
    id?: number
    options?: Partial<UseQueryOptions<[TAccount[], number]>>
  }

const useAllUsers = (props: TProps) => {
  const { options, ...allprops } = props

  return useQuery<[TAccount[], number]>({
    queryKey: [EQueryKeys.USERS, allprops],
    queryFn: async () => {
      const response = await getAllUsers(allprops)
      return response.data
    },
    staleTime: 5 * 60 * 1000,
    retry: true,
    ...options,
  })
}

export { useAllUsers }
