import { toast } from 'react-toastify'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { updateCompany } from '@/api/companies'
import { EQueryKeys } from '@/enums/query-keys.enum'
import { TCompany } from '@/types/company.types'

const useUpdateCompany = (onClose?: () => void) => {
  const queryClient = useQueryClient()

  return useMutation<TCompany, Error, { payload: FormData; id: number }>({
    mutationFn: async ({ payload, id }) => await updateCompany(id, payload),
    onSuccess: () => {
      toast('Company updated successfully.', { type: 'success' })
      onClose && onClose()
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.COMPANIES] })
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.COMPANY] })
    },
    onError: (err: any) => {
      toast(`Error: ${(err as any).message}`, { type: 'error' })
    },
  })
}

export { useUpdateCompany }
