import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useMutation } from '@tanstack/react-query'

import { requestPasswordReset } from '@/api/auth'
import { EAppRoutes } from '@/enums/app-routes.enum'

const useRequestPasswordReset = () => {
  const navigate = useNavigate()

  return useMutation<any, Error, { email: string }>({
    mutationFn: async ({ email }) => await requestPasswordReset(email),
    onSuccess: async () => {
      toast('Reset link sent to your email.', { type: 'success' })
      navigate(`/${EAppRoutes.LOGIN}`, { replace: true })
    },

    onError: (error: any) => {
      toast(`Error: ${error?.message}`, { type: 'error' })
    },
  })
}

export { useRequestPasswordReset }
