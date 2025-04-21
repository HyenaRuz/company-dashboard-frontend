import { Grid } from '@mui/material'

import { AuthForm } from '@/components/forms/login-form'

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
