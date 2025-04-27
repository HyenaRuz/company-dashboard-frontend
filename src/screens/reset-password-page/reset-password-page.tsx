import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Stack, TextField } from '@mui/material'
import axios from 'axios'
import * as yup from 'yup'

import { resetPassword } from '@/api/auth'
import { Button } from '@/components/ui/button'

type TFormData = {
  newPassword: string
  confirmPassword: string
}

const validationSchema = yup.object({
  newPassword: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Repeat your password'),
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
  const [loading, setLoading] = useState(false)

  const token = searchParams.get('token')

  const onSubmit = async (data: TFormData) => {
    if (!token) {
      toast.error('Invalid token.')
      return
    }

    setLoading(true)

    try {
      await resetPassword(token, data.newPassword, data.confirmPassword)
      toast.success('Password reset successfully.')
    } catch (error) {
      toast.error('Failed to reset password.')
    } finally {
      setLoading(false)
    }
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

          <Button type="submit" variant="contained" disabled={loading}>
            Reset Password
          </Button>
        </Stack>
      </form>
    </Grid>
  )
}

export { ResetPasswordPage }
