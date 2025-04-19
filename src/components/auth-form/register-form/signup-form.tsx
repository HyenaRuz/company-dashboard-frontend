import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Button, Stack, TextField, Typography } from '@mui/material'
import * as yup from 'yup'

import { checkEmail } from '@/api/account'
import { signup } from '@/api/auth'
import { EAppRoutes } from '@/enums/app-routes.enum'
import { setTokenToLocalStorage } from '@/helpers/localstorage.helper'

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Repeat your password'),
})

type TForm = {
  username: string
  email: string
  password: string
  repeatPassword: string
}

const SignupForm = () => {
  const [preview, setPreview] = useState<string | null>(null)

  const navigate = useNavigate()
  const fileRef = useRef<HTMLInputElement>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver(validationSchema),
  })

  const submit = async (payload: TForm) => {
    try {
      const check = await checkEmail(payload.email.trim())

      if (check.data) {
        toast('Email already exists', { type: 'error' })
        return
      }

      const file = fileRef.current?.files?.[0]

      const formData = new FormData()
      formData.append('username', payload.username)
      formData.append('email', payload.email)
      formData.append('password', payload.password)
      if (file) formData.append('avatar', file)

      const { data } = await signup(formData)

      setTokenToLocalStorage(data.tokens)

      toast('You have registered successfully.', { type: 'success' })
      navigate(EAppRoutes.DASHBOARD)
    } catch (err) {
      toast(`Error: ${(err as any).message}`, { type: 'error' })
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  return (
    <form onSubmit={handleSubmit(submit)} style={{ width: '100%', maxWidth: '300px' }}>
      <Stack spacing={2} alignItems="center">
        <Avatar src={preview || ''} sx={{ width: 96, height: 96 }} />
        <Button variant="outlined" onClick={() => fileRef.current?.click()}>
          Upload Avatar
        </Button>
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <Stack spacing={2} width="100%">
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                label="Username"
                fullWidth
                {...field}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                label="Email"
                fullWidth
                {...field}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                label="Password"
                type="password"
                fullWidth
                {...field}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />

          <Controller
            name="repeatPassword"
            control={control}
            render={({ field }) => (
              <TextField
                label="Repeat Password"
                type="password"
                fullWidth
                {...field}
                error={!!errors.repeatPassword}
                helperText={errors.repeatPassword?.message}
              />
            )}
          />

          <Button type="submit" variant="contained">
            Signup
          </Button>
        </Stack>

        <Typography>Do you already have an account?</Typography>
        <Button onClick={() => navigate(EAppRoutes.LOGIN)}>Login</Button>
      </Stack>
    </form>
  )
}

export { SignupForm }
