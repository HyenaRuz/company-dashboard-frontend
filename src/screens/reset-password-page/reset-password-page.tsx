import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Stack, TextField } from '@mui/material'
import * as yup from 'yup'

import { Button } from '@/components/ui/button'
import { useResetPassword } from '@/hooks/query-client'
import { passwordSchema } from '@/validation/user.validation'

type TFormData = {
  newPassword: string
  confirmPassword: string
}

const validationSchema = yup.object({
  newPassword: passwordSchema,
  confirmPassword: passwordSchema.oneOf([yup.ref('newPassword')], 'Passwords must match'),
})

const ResetPasswordPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    defaultValues: { newPassword: '', confirmPassword: '' },
    resolver: yupResolver(validationSchema),
  })
  const [searchParams] = useSearchParams()

  const token = searchParams.get('token')

  const resetPasswordMutation = useResetPassword()

  const onSubmit = async (data: TFormData) => {
    if (!token) {
      toast('Invalid token.', { type: 'error' })
      return
    }

    resetPasswordMutation.mutate({ token, ...data })
  }

  return (
    <Grid
      minHeight="100vh"
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextField
                label="New Password"
                type="password"
                fullWidth
                {...field}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <TextField
                label="Repeat Password"
                type="password"
                fullWidth
                {...field}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            )}
          />

          <Button type="submit" variant="contained">
            Reset Password
          </Button>
        </Stack>
      </form>
    </Grid>
  )
}

export { ResetPasswordPage }
