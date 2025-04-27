import { Navigate, Route, Routes } from 'react-router-dom'

import { EAppRoutes } from '@/enums/app-routes.enum'
import { ERole } from '@/enums/role.enum'
import { RouteProtection } from '@/helpers/route-protection'
import { useUser, useUserFromCache } from '@/hooks/query-client'
import { Admins } from '@/screens/admins'
import { Login } from '@/screens/auth/login'
import { Signup } from '@/screens/auth/signup'
import { CompaniesDashboard } from '@/screens/companies-dashboard'
import { Company } from '@/screens/company'
import { HomeAdmin } from '@/screens/home-admin'
import { HomeUser } from '@/screens/home-user/home-user'
import { Profile } from '@/screens/profile'
import { UserCompanies } from '@/screens/user-companies/user-companies'
import { Users } from '@/screens/users'

import { UserLayout } from '../user-layout/user-layout'

const Layout = () => {
  const cachedUser = useUserFromCache()
  const { data: user } = useUser({ enabled: !cachedUser })

  return (
    <Routes>
      <Route path={EAppRoutes.LOGIN} element={<Login />} />
      <Route path={EAppRoutes.SIGNUP} element={<Signup />} />

      <Route
        path="/"
        element={
          <RouteProtection>
            <UserLayout />
          </RouteProtection>
        }
      >
        <Route
          path={EAppRoutes.HOME}
          element={user?.role === ERole.USER ? <HomeUser /> : <HomeAdmin />}
        />
        <Route
          path={EAppRoutes.COMPANIES}
          element={user?.role === ERole.USER ? <UserCompanies /> : <CompaniesDashboard />}
        />
        <Route path={`${EAppRoutes.COMPANIES}/:id`} element={<Company />} />

        <Route path={EAppRoutes.PROFILE} element={<Profile />} />

        <Route
          path={EAppRoutes.USERS}
          element={
            <RouteProtection requiredRoles={[ERole.ADMIN, ERole.SUPERADMIN]}>
              <Users />
            </RouteProtection>
          }
        />
        <Route
          path={`${EAppRoutes.USERS}/:id`}
          element={
            <RouteProtection requiredRoles={[ERole.ADMIN, ERole.SUPERADMIN]}>
              <Profile />
            </RouteProtection>
          }
        />
        <Route
          path={EAppRoutes.ADMINS}
          element={
            <RouteProtection requiredRoles={[ERole.SUPERADMIN]}>
              <Admins />
            </RouteProtection>
          }
        />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  )
}

export { Layout }
