import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import { Link, Stack, Typography } from '@mui/material'
import * as yup from 'yup'

import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { EAppRoutes } from '@/enums/app-routes.enum'
import { useLogin } from '@/hooks/query-client'
import { emailSchema, passwordSchema } from '@/validation/user.validation'

const validationSchema = yup.object({
  login: emailSchema,
  password: passwordSchema,
})

type TProps = {
  onRegister: () => void
}

const LoginForm = ({ onRegister }: TProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const loginMutation = useLogin()
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    disabled: isLoading,
    resolver: yupResolver(validationSchema as any),
  })

  const submit = async (payload: { login: string; password: string }) => {
    loginMutation.mutate(payload, {
      onSuccess: () => {
        setIsLoading(true)
        navigate(`/${EAppRoutes.HOME}`)
      },
      onError: () => {
        setIsLoading(false)
      },
    })
  }

  return (
    <form style={{ width: '100%', maxWidth: '300px' }} onSubmit={handleSubmit(submit)}>
      <Stack spacing={2} alignItems="center">
        <Controller
          name="login"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Login"
              variant="outlined"
              fullWidth
              {...field}
              error={!!errors.login}
              helperText={errors.login?.message}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              {...field}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />

        <Button type="submit" variant="contained" disabled={isLoading}>
          Login
        </Button>
        <Typography>{"Don't have an account?"}</Typography>
        <Button onClick={onRegister} disabled={isLoading}>
          Sign up
        </Button>

        <Stack flexDirection={'row'} gap={1}>
          <Typography>{'Forgot your password?'}</Typography>
          <Link
            component="button"
            variant="body2"
            color="primary"
            onClick={() => navigate(`/${EAppRoutes.FORGOT_PASSWORD_PAGE}`)}
          >
            Reset password
          </Link>
        </Stack>
      </Stack>
    </form>
  )
}

export { LoginForm }
