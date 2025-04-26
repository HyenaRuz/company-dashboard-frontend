import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import * as yup from 'yup'

import { deleteAccount, recoverAccount, updateAccount, updateAccountAdmin } from '@/api/account'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { ERole } from '@/enums/role.enum'
import { useUserFromCache } from '@/hooks/query-client'
import { TAccount } from '@/types/account.types'

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.string().required('Role is required'),
})

type TForm = {
  username: string
  email: string
  role: string
}

type TFormUpdate = TForm & {
  avatarRemoved: boolean
}

const ProfileEditForm = ({
  setFormModalOpen,
  userData,
  adminForm,
  refreshData,
}: {
  setFormModalOpen: () => void
  userData: TAccount
  adminForm?: boolean
  refreshData?: () => void
}) => {
  const [preview, setPreview] = useState<string | null>(null)
  const user = useUserFromCache()

  const queryClient = useQueryClient()
  const fileRef = useRef<HTMLInputElement>(null)

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm | TFormUpdate>({
    defaultValues: {
      username: userData.username,
      email: userData.email,
      role: userData.role,
    },
    resolver: yupResolver(validationSchema),
  })

  const submitUser = async (payload: TForm) => {
    try {
      const file = fileRef.current?.files?.[0]

      const formData = new FormData()

      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      if (file) formData.append('avatar', file)

      await updateAccount(formData)

      await queryClient.invalidateQueries({ queryKey: ['me'] })
      setFormModalOpen()
      toast('Account updated successfully.', { type: 'success' })
    } catch (err) {
      toast(`Error: ${(err as any).message}`, { type: 'error' })
    }
  }

  const submitAdmin = async (payload: TForm) => {
    try {
      const file = fileRef.current?.files?.[0]

      const formData = new FormData()

      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, String(value))
        }
      })

      if (file) formData.append('avatar', file)

      await updateAccountAdmin(userData.id, formData)

      refreshData && refreshData()

      setFormModalOpen()

      toast('Account updated successfully.', { type: 'success' })
    } catch (err) {
      toast(`Error: ${(err as any).message}`, { type: 'error' })
    }
  }

  const submitDelete = async () => {
    try {
      await deleteAccount(userData!.id)

      refreshData && refreshData()

      setFormModalOpen()
      toast('Account deleted successfully.', { type: 'success' })
    } catch (err) {
      toast(`Error: ${(err as any).message}`, { type: 'error' })
    }
  }
  const submitRecover = async () => {
    try {
      await recoverAccount(userData!.id)

      refreshData && refreshData()

      setFormModalOpen()
      toast('Account deleted successfully.', { type: 'success' })
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
    <form style={{ width: '100%' }}>
      <Stack spacing={2} alignItems="center">
        {!adminForm && (
          <>
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
          </>
        )}

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
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            )}
          />

          {adminForm && (
            <>
              {user?.role === ERole.SUPERADMIN && (
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth>
                      <InputLabel id="role-label">Role</InputLabel>
                      <Select
                        {...field}
                        labelId="role-label"
                        label="Role"
                        value={field.value}
                        onChange={field.onChange}
                      >
                        <MenuItem value={ERole.USER}>User</MenuItem>
                        <MenuItem value={ERole.ADMIN}>Admin</MenuItem>
                      </Select>
                    </FormControl>
                  )}
                />
              )}

              <Button
                variant="outlined"
                color={userData?.deletedAt ? 'success' : 'error'}
                onClick={userData?.deletedAt ? submitRecover : submitDelete}
              >
                {userData?.deletedAt ? 'Restore User' : 'Delete User'}
              </Button>
            </>
          )}

          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(adminForm ? submitAdmin : submitUser)}
          >
            Update
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export { ProfileEditForm }
