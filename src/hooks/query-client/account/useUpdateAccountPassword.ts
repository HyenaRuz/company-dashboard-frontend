import { toast } from 'react-toastify'

import { useMutation } from '@tanstack/react-query'

import { updateAccountPassword } from '@/api/account'
import { TChangePassword } from '@/types/account.types'

const useUpdateAccountPassword = () => {
  return useMutation<void, Error, { payload: TChangePassword }>({
    mutationFn: async ({ payload }) => await updateAccountPassword(payload),
    onSuccess: () => {
      toast('Password updated successfully.', { type: 'success' })
    },
    onError: (err: any) => {
      toast(`Error: ${(err as any).message}`, { type: 'error' })
    },
  })
}

export { useUpdateAccountPassword }
