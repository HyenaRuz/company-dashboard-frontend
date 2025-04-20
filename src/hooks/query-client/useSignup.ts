import { useMutation, useQueryClient } from '@tanstack/react-query'

import { getMe } from '@/api/account'
import { signup } from '@/api/auth'
import { setTokenToLocalStorage } from '@/helpers/localstorage.helper'
import { TAuthResponse } from '@/types/auth.types'

type TSignupPayload = FormData

export const useSignup = () => {
  const queryClient = useQueryClient()

  return useMutation<TAuthResponse, unknown, TSignupPayload>({
    mutationFn: signup,
    onSuccess: async (data) => {
      setTokenToLocalStorage(data.tokens)

      await queryClient.prefetchQuery({
        queryKey: ['me'],
        queryFn: getMe,
      })
    },
  })
}
