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
    navigate(`/${EAppRoutes.LOGIN}`, { replace: true })
  }

  if (isLoading) {
    return <LinearProgress />
  }

  if (!user) {
    navigate(`/${EAppRoutes.LOGIN}`, { replace: true })
  }

  if (!user || (requiredRoles.length && !requiredRoles.includes(user.role))) {
    navigate(`/${EAppRoutes.HOME}`, { replace: true })
    return <></>
  }

  return children
}
export { RouteProtection }
