import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Stack, TextField } from '@mui/material'
import * as yup from 'yup'

import { Button } from '@/components/ui/button'
import { useRequestPasswordReset } from '@/hooks/query-client'
import { emailSchema } from '@/validation/user.validation'

const ForgotPasswordPage = () => {
  const { control, handleSubmit } = useForm<{ email: string }>({
    defaultValues: { email: '' },
    resolver: yupResolver(yup.object({ email: emailSchema })),
  })

  const requestPasswordResetMutation = useRequestPasswordReset()

  const onSubmit = async (data: { email: string }) => {
    requestPasswordResetMutation.mutate({ email: data.email })
  }

  return (
    <Grid
      minHeight="100vh"
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: '300px' }}>
        <Stack spacing={2}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <TextField {...field} label="Email" fullWidth />}
          />
          <Button type="submit" variant="contained">
            Send Reset Link
          </Button>
        </Stack>
      </form>
    </Grid>
  )
}

export { ForgotPasswordPage }
