import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Stack } from '@mui/material'
import * as yup from 'yup'

import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { useRequestPasswordReset } from '@/hooks/query-client'
import { emailSchema } from '@/validation/user.validation'

const ForgotPasswordPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({
    defaultValues: { email: '' },
    resolver: yupResolver(yup.object({ email: emailSchema })),
  })

  const requestPasswordResetMutation = useRequestPasswordReset()

  const onSubmit = async (data: { email: string }) => {
    requestPasswordResetMutation.mutate(
      { email: data.email },
      {
        onSuccess: (data) => {
          console.log(data.previewUrl)

          toast(
            <div>
              Reset link sent to your email.
              <Button
                sx={{ backgroundColor: '' }}
                type="button"
                onClick={() => window.open(data.previewUrl, '_blank')}
              >
                View Fake Email
              </Button>
            </div>,
            { type: 'info' },
          )
        },
      },
    )
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
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                {...field}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
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
