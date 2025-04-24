import { Navigate, Route, Routes } from 'react-router-dom'

import { EAppRoutes } from '@/enums/app-routes.enum'
import { ERole } from '@/enums/role.enum'
import { RouteProtection } from '@/helpers/with-route-protection'
import { Admins } from '@/screens/admins'
import { Login } from '@/screens/auth/login'
import { Signup } from '@/screens/auth/signup'
import { Companies } from '@/screens/companies'
import { CompaniesDashboard } from '@/screens/companies-dashboard'
import { Home } from '@/screens/home'
import { HomeAdmin } from '@/screens/home-admin'
import { Profile } from '@/screens/profile'
import { Users } from '@/screens/users'

import { UserLayout } from '../user-layout/user-layout'

const Layout = () => {
  return (
    <Routes>
      <Route path={EAppRoutes.LOGIN} element={<Login />} />
      <Route path={EAppRoutes.SIGNUP} element={<Signup />} />

      <Route
        path="/"
        element={
          <RouteProtection requiredRoles={[ERole.USER]}>
            <UserLayout />
          </RouteProtection>
        }
      >
        <Route path={EAppRoutes.HOME} element={<Home />} />
        <Route path={EAppRoutes.COMPANIES} element={<Companies />} />
        <Route path={EAppRoutes.PROFILE} element={<Profile />} />
      </Route>

      <Route
        path="/admin"
        element={
          <RouteProtection requiredRoles={[ERole.ADMIN, ERole.SUPERADMIN]}>
            <UserLayout />
          </RouteProtection>
        }
      >
        <Route path={EAppRoutes.HOME} element={<HomeAdmin />} />
        <Route path={EAppRoutes.COMPANIES} element={<CompaniesDashboard />} />
        <Route path={EAppRoutes.PROFILE} element={<Profile />} />
        <Route path={EAppRoutes.USERS} element={<Users />} />
        <Route
          path={EAppRoutes.ADMINS}
          element={
            <RouteProtection requiredRoles={[ERole.SUPERADMIN]}>
              <Admins />
            </RouteProtection>
          }
        />
      </Route>

      <Route path="/admin/*" element={<Navigate to="/admin/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  )
}

export { Layout }
