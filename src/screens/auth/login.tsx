import { Grid } from '@mui/material'

import { AuthForm } from '@/components/auth-form/login-form'

const Login = () => {
  return (
    <Grid
      minHeight="100vh"
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <AuthForm />
    </Grid>
  )
}

export { Login }
