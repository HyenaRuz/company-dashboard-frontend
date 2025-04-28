import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { LinearProgress } from '@mui/material'

import { EAppRoutes } from '@/enums/app-routes.enum'
import { ERole } from '@/enums/role.enum'
import { TAccount } from '@/types/account.types'

import { getTokensFromLocalStorage } from './localstorage.helper'
import { logout } from './logout'

interface RouteProtectionProps {
  children: React.ReactNode
  requiredRoles?: ERole[]
  user?: TAccount // передаем данные пользователя
  isLoading?: boolean
}

const RouteProtection = ({
  children,
  requiredRoles = [],
  user,
  isLoading,
}: RouteProtectionProps) => {
  const tokens = getTokensFromLocalStorage()
  const navigate = useNavigate()

  if (!tokens?.accessToken) {
    logout()
    return <Navigate to="/login" replace />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (isLoading) {
    return <LinearProgress />
  }

  useEffect(() => {
    if (!isLoading && (!user || (requiredRoles.length && !requiredRoles.includes(user.role)))) {
      if (user?.role === ERole.USER) {
        navigate(EAppRoutes.HOME, { replace: true })
      } else {
        navigate(`${EAppRoutes.ADMIN}/${EAppRoutes.HOME}`, { replace: true })
      }
    }
  }, [isLoading, user, requiredRoles, navigate])
  return children
}
export { RouteProtection }
