import { PropsWithChildren, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { Container, LinearProgress } from '@mui/material'

import { EAppRoutes } from '@/enums/app-routes.enum'
import { ERole } from '@/enums/role.enum'
import { useUser } from '@/hooks/query-client'

import { getTokensFromLocalStorage } from './localstorage.helper'
import { useLogout } from './logout'

const RouteProtectionWrapper = ({
  children,
  requiredRoles = [],
}: PropsWithChildren<{ requiredRoles?: ERole[] }>) => {
  const { data: user, isLoading } = useUser()

  const navigate = useNavigate()

  if (isLoading) {
    return (
      <Container>
        <LinearProgress />
      </Container>
    )
  }

  if (!user || (requiredRoles.length && !requiredRoles.includes(user.role))) {
    navigate(EAppRoutes.HOME)
    return <></>
  }

  return children
}

const RouteProtection = ({
  children,
  requiredRoles = [],
}: PropsWithChildren<{ requiredRoles?: ERole[] }>) => {
  const tokens = getTokensFromLocalStorage()
  const { data: user, isLoading } = useUser()
  const navigate = useNavigate()

  if (!tokens?.accessToken) {
    useLogout()
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

export { RouteProtectionWrapper, RouteProtection }
