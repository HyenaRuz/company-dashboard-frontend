import { useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Stack, Typography } from '@mui/material'
import * as yup from 'yup'

import { checkEmail } from '@/api/account'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { useSignup } from '@/hooks/query-client'
import { emailSchema, passwordSchema, usernameSchema } from '@/validation/user.validation'

const validationSchema = yup.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  repeatPassword: passwordSchema.oneOf([yup.ref('password')], 'Passwords must match'),
})

type TForm = {
  username: string
  email: string
  password: string
  repeatPassword: string
}

type TProps = {
  onLogin: () => void
}

const RegisterForm = ({ onLogin }: TProps) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const signupMutation = useSignup()

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
    disabled: isLoading,
    resolver: yupResolver(validationSchema),
  })

  const submit = async (payload: TForm) => {
    const check = await checkEmail(payload.email.trim())

    if (check.data) {
      toast('Email already exists', { type: 'error' })
      return
    }

    const file = fileRef.current?.files?.[0]

    const formData = new FormData()

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value)
      }
    })

    if (file) formData.append('avatar', file)

    signupMutation.mutate(formData, {
      onSuccess: () => {
        setIsLoading(true)
        onLogin()
      },
      onError: () => {
        setIsLoading(false)
      },
    })
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
        <Button onClick={() => fileRef.current?.click()}>Upload Avatar</Button>
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

          <Button type="submit" variant="contained" loading={isLoading}>
            Signup
          </Button>
        </Stack>

        <Typography>Do you already have an account?</Typography>
        <Button type="button" onClick={onLogin} disabled={isLoading}>
          Login
        </Button>
      </Stack>
    </form>
  )
}

export { RegisterForm }
