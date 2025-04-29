import { toast } from 'react-toastify'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteCompany } from '@/api/companies'
import { EQueryKeys } from '@/enums/query-keys.enum'
import { TCompany } from '@/types/company.types'

const useDeleteCompany = () => {
  const queryClient = useQueryClient()

  return useMutation<TCompany, Error, { id: number }>({
    mutationFn: async ({ id }) => await deleteCompany(id),
    onSuccess: () => {
      toast('Company deleted successfully', { type: 'success' })

      queryClient.invalidateQueries({ queryKey: [EQueryKeys.COMPANIES] })
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.COMPANY] })
    },
    onError: (err: any) => {
      toast(`Error: ${(err as any).message}`, { type: 'error' })
    },
  })
}

export { useDeleteCompany }
