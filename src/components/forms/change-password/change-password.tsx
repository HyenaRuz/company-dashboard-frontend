import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mui/material'
import * as yup from 'yup'

import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { useUpdateAccountPassword } from '@/hooks/query-client'
import { TChangePassword } from '@/types/account.types'
import { passwordSchema } from '@/validation/user.validation'

const validationSchema = yup.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmPassword: passwordSchema.oneOf([yup.ref('newPassword')], 'Passwords must match'),
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

  const updateAccountPasswordMutation = useUpdateAccountPassword()

  const submit = async (payload: TChangePassword) => {
    updateAccountPasswordMutation.mutate(
      { payload },
      {
        onSuccess: () => {
          onClose()
        },
        onError: (error: any) => {
          const message = error?.response?.data?.message

          if (message === 'Old password is incorrect') {
            setError('oldPassword', {
              type: 'manual',
              message,
            })
          } else {
            toast(`Error: ${message}`, { type: 'error' })
          }
        },
      },
    )
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
