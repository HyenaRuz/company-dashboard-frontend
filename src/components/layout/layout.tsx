import { Navigate, Route, Routes } from 'react-router-dom'

import { EAppRoutes } from '@/enums/app-routes.enum'
import { getTokensFromLocalStorage } from '@/helpers/localstorage.helper'
import { Login } from '@/screens/auth/login'
import { Signup } from '@/screens/auth/signup'
import { Companies } from '@/screens/companies'
import { Home } from '@/screens/home'
import { Profile } from '@/screens/profile'

import { UserLayout } from '../user-layout/user-layout'

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const tokens = getTokensFromLocalStorage()

  return tokens?.accessToken ? children : <Navigate to="/login" replace />
}

const Layout = () => {
  return (
    <Routes>
      <Route path={EAppRoutes.LOGIN} element={<Login />} />
      <Route path={EAppRoutes.SIGNUP} element={<Signup />} />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <UserLayout />
          </PrivateRoute>
        }
      >
        <Route path={EAppRoutes.HOME} element={<Home />} />
        <Route path={EAppRoutes.COMPANIES} element={<Companies />} />
        <Route path={EAppRoutes.PROFILE} element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to='/home' />} />
    </Routes>
  )
}

export { Layout }
