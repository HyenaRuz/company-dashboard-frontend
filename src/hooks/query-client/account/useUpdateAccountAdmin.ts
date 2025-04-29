import { toast } from 'react-toastify'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateAccountAdmin } from '@/api/account'
import { EQueryKeys } from '@/enums/query-keys.enum'
import { TAccount } from '@/types/account.types'

const useUpdateAccountAdmin = (setFormModalOpen?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation<TAccount, Error, { id: number; payload: FormData }>({
    mutationFn: async ({ id, payload }) => await updateAccountAdmin(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.USERS] })
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.USER] })
      toast('Account updated successfully.', { type: 'success' })
      setFormModalOpen && setFormModalOpen()
    },
    onError: (err: any) => {
      toast(`Error: ${(err as any).message}`, { type: 'error' })
    },
  })
}

export { useUpdateAccountAdmin }
