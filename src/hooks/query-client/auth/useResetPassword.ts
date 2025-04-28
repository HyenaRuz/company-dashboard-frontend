import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useMutation } from '@tanstack/react-query'

import { resetPassword } from '@/api/auth'
import { EAppRoutes } from '@/enums/app-routes.enum'

const useResetPassword = () => {
  const navigate = useNavigate()

  return useMutation<void, Error, { token: string; newPassword: string; confirmPassword: string }>({
    mutationFn: async ({ token, newPassword, confirmPassword }) =>
      await resetPassword(token, newPassword, confirmPassword),
    onSuccess: () => {
      toast('Password reset successfully.', { type: 'success' })
      navigate(EAppRoutes.LOGIN, { replace: true })
    },

    onError: (error: any) => {
      toast(`Error: ${error?.message}`, { type: 'error' })
    },
  })
}

export { useResetPassword }
