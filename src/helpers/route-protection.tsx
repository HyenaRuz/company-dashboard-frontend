import { useNavigate } from 'react-router-dom'

import { LinearProgress } from '@mui/material'

import { EAppRoutes } from '@/enums/app-routes.enum'
import { ERole } from '@/enums/role.enum'
import { useMyAccount, useUserFromCache } from '@/hooks/query-client'
import { TAccount } from '@/types/account.types'

interface RouteProtectionProps {
  children: React.ReactNode
  requiredRoles?: ERole[]
  user?: TAccount
  isLoading?: boolean
}

const RouteProtection = ({ children, requiredRoles = [] }: RouteProtectionProps) => {
  const navigate = useNavigate()

  const cachedUser = useUserFromCache()
  const { data: user, isLoading } = useMyAccount({ enabled: !cachedUser })

  if (isLoading) {
    return <LinearProgress />
  }

  if (!user || (requiredRoles.length && !requiredRoles.includes(user.role))) {
    navigate(EAppRoutes.HOME, { replace: true })
    return <></>
  }

  return children
}
export { RouteProtection }
