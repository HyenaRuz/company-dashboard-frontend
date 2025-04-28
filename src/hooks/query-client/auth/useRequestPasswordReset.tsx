import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button } from '@mui/material'
import { useMutation } from '@tanstack/react-query'

import { requestPasswordReset } from '@/api/auth'
import { EAppRoutes } from '@/enums/app-routes.enum'

const useRequestPasswordReset = () => {
  const navigate = useNavigate()

  return useMutation<any, Error, { email: string }>({
    mutationFn: async ({ email }) => await requestPasswordReset(email),
    onSuccess: async (data) => {
      toast('Reset link sent to your email.', { type: 'success' })
      navigate(`/${EAppRoutes.LOGIN}`, { replace: true })

      console.log(data.previewUrl)

      toast(
        <div>
          Reset link sent to your email.
          <Button type="button" onClick={() => window.open(data.previewUrl, '_blank')}>
            View Fake Email
          </Button>
        </div>,
        { type: 'info' },
      )
    },

    onError: (error: any) => {
      toast(`Error: ${error?.message}`, { type: 'error' })
    },
  })
}

export { useRequestPasswordReset }
