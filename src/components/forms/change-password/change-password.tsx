import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/material'
import * as yup from 'yup'

import { updateAccountPassword } from '@/api/account'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { TChangePassword } from '@/types/account.types'

const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  newPassword: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .required('Repeat your password'),
})

const ChangePassword = ({ onClose }: { onClose: () => void }) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TChangePassword>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(validationSchema),
  })

  const submit = async (payload: TChangePassword) => {
    try {
      await updateAccountPassword(payload)
      toast('You have successfully changed your password.', { type: 'success' })

      onClose()
    } catch (error: any) {
      const message = error?.response?.data?.message

      toast(`Error: ${message}`, { type: 'error' })

      if (message === 'Old password is incorrect') {
        setError('oldPassword', {
          type: 'manual',
          message,
        })
      } else {
        toast(`Error: ${message}`, { type: 'error' })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
      <Stack spacing={2} alignItems="center">
        <Stack spacing={2} width="100%">
          <Controller
            name="oldPassword"
            control={control}
            render={({ field }) => (
              <TextField
                label="Password"
                type="password"
                fullWidth
                {...field}
                error={!!errors.oldPassword}
                helperText={errors.oldPassword?.message}
              />
            )}
          />

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
            Change
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export { ChangePassword }
