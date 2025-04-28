import { toast } from 'react-toastify'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { recoverCompany } from '@/api/companies'
import { EQueryKeys } from '@/enums/query-keys.enum'

const useRecoverCompany = (onClose?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, { id: number }>({
    mutationFn: async ({ id }) => {
      await recoverCompany(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.COMPANIES] })
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.COMPANY] })
      toast('Company recover successfully.', { type: 'success' })
      onClose && onClose()
    },
    onError: (error: any) => {
      toast(`Error: ${error.message}`, { type: 'error' })
    },
  })
}

export { useRecoverCompany }
