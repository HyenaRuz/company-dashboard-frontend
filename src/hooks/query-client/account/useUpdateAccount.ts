import { toast } from 'react-toastify'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateAccount } from '@/api/account'
import { EQueryKeys } from '@/enums/query-keys.enum'
import { TAccount } from '@/types/account.types'

export const useUpdateAccount = (setFormModalOpen?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation<TAccount, Error, FormData>({
    mutationFn: updateAccount,
    onSuccess: () => {
      toast('Account updated successfully.', { type: 'success' })
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.ME] })
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.USERS] })
      setFormModalOpen && setFormModalOpen()
    },
    onError: (err: any) => {
      toast(`Error: ${(err as any).message}`, { type: 'error' })
    },
  })
}
