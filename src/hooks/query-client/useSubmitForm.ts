import { toast } from 'react-toastify'

import { useMutation, useQueryClient } from '@tanstack/react-query'

type TSubmitFormOptions = {
  successMessage?: string
  queryKey?: readonly unknown[]
  onSuccessCallback?: () => void
}

export const useSubmitForm = (
  updateFn: (payload: FormData, id?: number) => Promise<void>,
  {
    successMessage = 'Updated successfully.',
    queryKey,
    onSuccessCallback,
  }: TSubmitFormOptions = {},
) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateFn,
    onSuccess: () => {
      if (onSuccessCallback) onSuccessCallback()

      toast(successMessage, { type: 'success' })

      if (queryKey) queryClient.invalidateQueries({ queryKey })
    },

    onError: (err: any) => {
      toast(`Error: ${(err as any).message}`, { type: 'error' })
    },
  })
}
