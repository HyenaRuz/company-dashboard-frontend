import { toast } from 'react-toastify'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteAccount } from '@/api/account'
import { EQueryKeys } from '@/enums/query-keys.enum'

const useDeleteAccount = () => {
  const queryClient = useQueryClient()
  return useMutation<void, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      await deleteAccount(id)
    },
    onSuccess: () => {
      toast('Account deleted successfully.', { type: 'success' })
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.USERS] })
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.USER] })
    },
    onError: (error: any) => {
      toast(`Error: ${error.message}`, { type: 'error' })
    },
  })
}

export { useDeleteAccount }
