import { Route } from 'react-router-dom'
import { ERole } from '@/enums/role.enum'
import { RouteProtection } from '@/helpers/route-protection'

type AppRouteProps = {
  path: string
  element: JSX.Element
  requiredRoles?: ERole[]
}

const CustomRoute = ({ element, requiredRoles, ...rest }: AppRouteProps) => {
  return (
    <Route
      {...rest}
      element={<RouteProtection requiredRoles={requiredRoles}>{element}</RouteProtection>}
    />
  )
}

export default CustomRoute