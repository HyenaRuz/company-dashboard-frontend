// hooks/useLogin.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { getMe } from '@/api/account'
import { login } from '@/api/auth'
import { setTokenToLocalStorage } from '@/helpers/localstorage.helper'
import { TAuthResponse } from '@/types/auth.types'

type TLoginPayload = { login: string; password: string }

export const useLogin = () => {
  const queryClient = useQueryClient()

  return useMutation<TAuthResponse, unknown, TLoginPayload>({
    mutationFn: login,
    onSuccess: async (data) => {
      setTokenToLocalStorage(data.tokens)

      await queryClient.prefetchQuery({
        queryKey: ['me'],
        queryFn: getMe,
      })
    },
  })
}
