import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, Stack, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import * as yup from 'yup'

import { checkEmail, updateAccount } from '@/api/account'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { EAppRoutes } from '@/enums/app-routes.enum'
import { useSignup } from '@/hooks/query-client'
import { TAccount } from '@/types/account.types'

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  //   email: yup.string().email('Invalid email').required('Email is required'),
})

type TForm = {
  username: string

  //   email: string
}

type TFormUpdate = TForm & {
  avatarRemoved: boolean
}

const ProfileEditForm = ({
  setFormModalOpen,
  userData,
}: {
  setFormModalOpen: () => void
  userData: TAccount
}) => {
  const [preview, setPreview] = useState<string | null>(null)

  const queryClient = useQueryClient()
  const fileRef = useRef<HTMLInputElement>(null)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TForm | TFormUpdate>({
    defaultValues: {
      username: userData.username,
      //   email: '',
    },
    resolver: yupResolver(validationSchema),
  })

  const submit = async (payload: TForm) => {
    // const check = await checkEmail(payload.email.trim())

    // if (check.data) {
    //   toast('Email already exists', { type: 'error' })
    //   return
    // }

    try {
      const file = fileRef.current?.files?.[0]

      const formData = new FormData()

      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value)
        }
      })

      if (file) formData.append('avatar', file)

      await updateAccount(formData)

      queryClient.invalidateQueries({ queryKey: ['me'] })
      setFormModalOpen()
      toast('Avatar updated successfully.', { type: 'success' })
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
      setValue('avatarRemoved', false)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (userData?.avatarUrl) {
      setPreview(userData.avatarUrl)
    }
  }, [userData])

  return (
    <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
      <Stack spacing={2} alignItems="center">
        <Avatar src={preview || ''} sx={{ width: 240, height: 240 }} />

        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <Stack flexDirection="row" gap={4}>
          <Button variant="contained" onClick={() => fileRef.current?.click()}>
            Upload Avatar
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: 'var(--color-red)' }}
            onClick={() => {
              setPreview('')
              setValue('avatarRemoved', true)
              if (fileRef.current) {
                fileRef.current.value = ''
              }
            }}
            disabled={!preview}
          >
            Remove Avatar
          </Button>
        </Stack>

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

          <Button type="submit" variant="contained">
            Update
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export { ProfileEditForm }
