import { toast } from 'react-toastify'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { recoverAccount } from '@/api/account'
import { EQueryKeys } from '@/enums/query-keys.enum'

const useRecoverAccount = () => {
  const queryClient = useQueryClient()
  return useMutation<void, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      await recoverAccount(id)
    },
    onSuccess: () => {
      toast('Account recover successfully.', { type: 'success' })
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.USERS] })
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.USER] })
    },
    onError: (error: any) => {
      toast(`Error: ${error.message}`, { type: 'error' })
    },
  })
}

export { useRecoverAccount }
