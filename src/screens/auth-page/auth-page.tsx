import { useState } from 'react'

import { Grid } from '@mui/material'

import { LoginForm } from '@/components/forms/login-form'
import { RegisterForm } from '@/components/forms/register-form'

enum EAuthMode {
  LOGIN = 'login',
  REGISTER = 'register',
}

const AuthPage = () => {
  const [mode, setMode] = useState(EAuthMode.LOGIN)

  return (
    <Grid
      minHeight="100vh"
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {mode === EAuthMode.LOGIN && <LoginForm onRegister={() => setMode(EAuthMode.REGISTER)} />}
      {mode === EAuthMode.REGISTER && <RegisterForm onLogin={() => setMode(EAuthMode.LOGIN)} />}
    </Grid>
  )
}

export { AuthPage }
