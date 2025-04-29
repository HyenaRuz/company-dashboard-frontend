import { toast } from 'react-toastify'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { getMe } from '@/api/account'
import { login } from '@/api/auth'
import { EQueryKeys } from '@/enums/query-keys.enum'
import { setTokenToLocalStorage } from '@/helpers/localstorage.helper'
import { TAuthResponse } from '@/types/auth.types'

const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation<TAuthResponse, Error, { login: string; password: string }>({
    mutationFn: login,
    onSuccess: async (data) => {
      setTokenToLocalStorage(data.tokens)

      toast('You have successfully logged in.', { type: 'success' })

      await queryClient.prefetchQuery({
        queryKey: [EQueryKeys.ME],
        queryFn: getMe,
      })
    },

    onError: (error: any) => {
      toast(`Error: ${error?.message}`, { type: 'error' })
    },
  })
}

export { useLogin }
