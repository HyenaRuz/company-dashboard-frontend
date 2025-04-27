import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import { Stack, Typography } from '@mui/material'
import * as yup from 'yup'

import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { EAppRoutes } from '@/enums/app-routes.enum'
import { useLogin } from '@/hooks/query-client'

const validationSchema = yup.object({
  login: yup.string().required('Login is required'),
  password: yup.string().required('Password is required'),
})

const AuthForm = () => {
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
    resolver: yupResolver(validationSchema as any),
  })

  const submit = async (payload: { login: string; password: string }) => {
    loginMutation.mutate(payload, {
      onSuccess: () => {
        toast('You have successfully logged in.', { type: 'success' })
        navigate(EAppRoutes.HOME)
      },
      onError: (error: any) => {
        toast(`Error: ${error?.message}`, { type: 'error' })
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

        <Button type="submit" variant="contained">
          Login
        </Button>
        <Typography>{"Don't have an account?"}</Typography>
        <Button onClick={() => navigate(`/${EAppRoutes.SIGNUP}`)}>Sign up</Button>
      </Stack>
    </form>
  )
}

export { AuthForm }
