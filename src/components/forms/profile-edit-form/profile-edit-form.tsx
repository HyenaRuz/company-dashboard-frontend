import { RefObject, useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { Avatar, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import * as yup from 'yup'

import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { ERole } from '@/enums/role.enum'
import {
  useDeleteAccount,
  useRecoverAccount,
  useUpdateAccount,
  useUpdateAccountAdmin,
  useUserFromCache,
} from '@/hooks/query-client'
import { TAccount } from '@/types/account.types'
import { emailSchema, usernameSchema } from '@/validation/user.validation'

const validationSchema = yup.object({
  username: usernameSchema,
  email: emailSchema,
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
}: {
  setFormModalOpen: () => void
  userData: TAccount
  adminForm?: boolean
  refreshData?: () => void
}) => {
  const [preview, setPreview] = useState<string | null>(null)
  const user = useUserFromCache()

  const fileRef = useRef<HTMLInputElement>(null)

  const useUpdateAccountMutation = useUpdateAccount()
  const updateAccountAdminMutation = useUpdateAccountAdmin()
  const deleteAccountMutation = useDeleteAccount(setFormModalOpen)
  const recoverAccountMutation = useRecoverAccount(setFormModalOpen)

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

  const createFormData = (payload: TForm, fileRef: RefObject<HTMLInputElement>): FormData => {
    const formData = new FormData()

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value))
      }
    })

    const file = fileRef.current?.files?.[0]
    if (file) formData.append('avatar', file)

    return formData
  }

  const submitUser = async (payload: TForm) => {
    const formData = createFormData(payload, fileRef)
    useUpdateAccountMutation.mutate(formData)
  }

  const submitAdmin = async (payload: TForm) => {
    const formData = createFormData(payload, fileRef)
    updateAccountAdminMutation.mutate({ payload: formData, id: userData.id })
  }

  const submitDelete = () => {
    deleteAccountMutation.mutate({ id: userData.id })
  }

  const submitRecover = async () => {
    recoverAccountMutation.mutate({ id: userData.id })
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
    <form style={{ width: '100%' }} onSubmit={handleSubmit(adminForm ? submitAdmin : submitUser)}>
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
                type="button"
                variant="outlined"
                color={userData?.deletedAt ? 'success' : 'error'}
                onClick={userData?.deletedAt ? submitRecover : submitDelete}
              >
                {userData?.deletedAt ? 'Restore User' : 'Delete User'}
              </Button>
            </>
          )}

          <Button type="submit" variant="contained">
            Update
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export { ProfileEditForm }
