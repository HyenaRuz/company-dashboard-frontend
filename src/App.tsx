// import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import { LinearProgress } from '@mui/material'

import { Layout } from './components/layout'
import { useUser } from './hooks/query-client/useUser'

function App() {
  const { isLoading } = useUser()

  return (
    <>
      {isLoading ? <LinearProgress /> : <Layout />}

      <ToastContainer theme="dark" />
    </>
  )
}

export default App
