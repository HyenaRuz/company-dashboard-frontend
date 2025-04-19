import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import { getMe } from './api/account'
import { Layout } from './components/layout'
import { getTokensFromLocalStorage } from './helpers/localstorage.helper'
import { useAppDispatch } from './store'
import { clearAuth, setAuth } from './store/slices/auth.slice'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const tokens = getTokensFromLocalStorage()
    if (!tokens?.accessToken) return

    getMe()
      .then((res) => {
        dispatch(setAuth({ user: res.data, tokens }))
      })
      .catch(() => {
        dispatch(clearAuth())
      })
  }, [])

  return (
    <>
      <Layout />

      <ToastContainer theme="dark" />
    </>
  )
}

export default App
