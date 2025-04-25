import { useNavigate } from 'react-router-dom'

import { useQueryClient } from '@tanstack/react-query'

import { EAppRoutes } from '@/enums/app-routes.enum'

const useLogout = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return () => {
    localStorage.clear()
    queryClient.invalidateQueries({ queryKey: ['me'] })

    navigate(EAppRoutes.LOGIN)
  }
}

export { useLogout }
