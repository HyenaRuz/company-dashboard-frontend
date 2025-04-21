import { Grid } from '@mui/material'

import { SignupForm } from '@/components/forms/register-form'

const Signup = () => {
  return (
    <Grid
      minHeight="100vh"
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <SignupForm />
    </Grid>
  )
}

export { Signup }
