import { toast } from 'react-toastify'

import { useMutation } from '@tanstack/react-query'

import { signup } from '@/api/auth'
import { setTokenToLocalStorage } from '@/helpers/localstorage.helper'
import { TAuthResponse } from '@/types/auth.types'

const useSignup = () => {
  return useMutation<TAuthResponse, Error, FormData>({
    mutationFn: signup,
    onSuccess: async (data) => {
      setTokenToLocalStorage(data.tokens)

      toast('You have registered successfully.', { type: 'success' })
    },

    onError: (error: any) => {
      toast(`Error: ${error.message}`, { type: 'error' })
    },
  })
}

export { useSignup }
