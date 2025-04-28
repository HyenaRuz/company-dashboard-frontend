import { ErrorOption } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useMutation } from '@tanstack/react-query'

import { updateAccountPassword } from '@/api/account'
import { TChangePassword } from '@/types/account.types'

const useUpdateAccountPassword = (
  onClose: () => void,
  setError: (
    name: 'oldPassword' | 'root' | `root.${string}` | 'newPassword' | 'confirmPassword',
    error: ErrorOption,
    options?: {
      shouldFocus: boolean
    },
  ) => void,
) => {
  return useMutation<void, Error, { payload: TChangePassword }>({
    mutationFn: async ({ payload }) => await updateAccountPassword(payload),
    onSuccess: () => {
      toast('Password updated successfully.', { type: 'success' })
      onClose && onClose()
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message

      toast(`Error: ${message}`, { type: 'error' })

      if (message === 'Old password is incorrect') {
        setError('oldPassword', {
          type: 'manual',
          message,
        })
      } else {
        toast(`Error: ${message}`, { type: 'error' })
      }
    },
  })
}

export { useUpdateAccountPassword }
