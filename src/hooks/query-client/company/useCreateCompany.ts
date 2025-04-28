import { toast } from 'react-toastify'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createCompany } from '@/api/companies'
import { EQueryKeys } from '@/enums/query-keys.enum'
import { TCompany } from '@/types/company.types'

const useCreateCompany = (onClose?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation<TCompany, Error, FormData>({
    mutationFn: createCompany,
    onSuccess: () => {
      toast('Company created successfully.', { type: 'success' })
      onClose && onClose()
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.COMPANIES] })
    },
    onError: (err: any) => {
      toast(`Error: ${(err as any).message}`, { type: 'error' })
    },
  })
}

export { useCreateCompany }
