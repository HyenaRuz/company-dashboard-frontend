import { toast } from 'react-toastify'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateAccountAdmin } from '@/api/account'
import { EQueryKeys } from '@/enums/query-keys.enum'
import { TAccount } from '@/types/account.types'

export const useUpdateAccountAdmin = () => {
  const queryClient = useQueryClient()

  return useMutation<TAccount, Error, { id: number; payload: FormData }>({
    mutationFn: async ({ id, payload }) => await updateAccountAdmin(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.USERS] })
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.USER] })
      toast('Account updated successfully.', { type: 'success' })
    },
    onError: (err: any) => {
      toast(`Error: ${(err as any).message}`, { type: 'error' })
    },
  })
}
