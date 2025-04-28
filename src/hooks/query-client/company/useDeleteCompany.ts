import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteCompany } from '@/api/companies'
import { EAppRoutes } from '@/enums/app-routes.enum'
import { EQueryKeys } from '@/enums/query-keys.enum'
import { ERole } from '@/enums/role.enum'
import { TCompany } from '@/types/company.types'

import { useUserFromCache } from '../account/useUserFromCache'

const useDeleteCompany = (onClose?: () => void) => {
  const queryClient = useQueryClient()
  const user = useUserFromCache()
  const navigate = useNavigate()

  return useMutation<TCompany, Error, { id: number }>({
    mutationFn: async ({ id }) => await deleteCompany(id),
    onSuccess: () => {
      toast('Company deleted successfully', { type: 'success' })
      onClose && onClose()
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.COMPANIES] })
      queryClient.invalidateQueries({ queryKey: [EQueryKeys.COMPANY] })

      if (user?.role === ERole.USER) {
        navigate(`/${EAppRoutes.COMPANIES}`, { replace: true })
      }
    },
    onError: (err: any) => {
      toast(`Error: ${(err as any).message}`, { type: 'error' })
    },
  })
}

export { useDeleteCompany }
