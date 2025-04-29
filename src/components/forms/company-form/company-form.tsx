import { RefObject, useEffect, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Stack } from '@mui/material'
import * as yup from 'yup'

import placeholder from '@/assets/placeholder.png'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
import { EAppRoutes } from '@/enums/app-routes.enum'
import { ERole } from '@/enums/role.enum'
import {
  useCreateCompany,
  useDeleteCompany,
  useRecoverCompany,
  useUpdateCompany,
  useUserFromCache,
} from '@/hooks/query-client'
import { TCompany } from '@/types/company.types'

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  service: yup.string().required('Service is required'),
  capital: yup.string().required('Capital is required'),
})

type TForm = {
  name: string
  service: string
  capital: string
  deletedAt?: Date
}

type TFormUpdate = TForm & {
  logoRemoved: boolean
}

type TProps = {
  onClose: () => void
  company?: TCompany | null
  type?: 'create' | 'update'
}

const CompanyForm = ({ onClose, company, type = 'create' }: TProps) => {
  const [preview, setPreview] = useState<string | null>(null)

  const fileRef = useRef<HTMLInputElement>(null)
  const defaultValues = {
    name: company?.name || '',
    service: company?.service || '',
    capital: `${company?.capital}` || '',
    deletedAt: company?.deletedAt ? new Date(company.deletedAt) : undefined,
  }

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm | TFormUpdate>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const user = useUserFromCache()
  const navigate = useNavigate()

  const createFormData = (payload: TForm, fileRef: RefObject<HTMLInputElement>): FormData => {
    const formData = new FormData()

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value))
      }
    })

    const file = fileRef.current?.files?.[0]
    if (file) formData.append('logo', file)

    return formData
  }

  const updateCompanyMutation = useUpdateCompany()
  const createCompanyMutation = useCreateCompany()
  const deleteCompanyMutation = useDeleteCompany()
  const recoverCompanyMutation = useRecoverCompany()

  const createSubmit: SubmitHandler<TForm> = async (payload: TForm) => {
    const formData = createFormData(payload, fileRef)
    createCompanyMutation.mutate(formData, {
      onSuccess: () => {
        onClose()
      },
    })
  }
  const updateSubmit: SubmitHandler<TForm> = async (payload: TForm) => {
    const formData = createFormData(payload, fileRef)
    updateCompanyMutation.mutate(
      { payload: formData, id: company?.id || 0 },
      {
        onSuccess: () => {
          onClose()
        },
      },
    )
  }

  const deleteSubmit = async () => {
    if (!company) return
    deleteCompanyMutation.mutate(
      { id: company.id },
      {
        onSuccess: () => {
          onClose()
          if (user?.role === ERole.USER) {
            navigate(`/${EAppRoutes.COMPANIES}`, { replace: true })
          }
        },
      },
    )
  }

  const recoverSubmit = async () => {
    if (!company) return
    recoverCompanyMutation.mutate(
      { id: company.id },
      {
        onSuccess: () => {
          onClose()
        },
      },
    )
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
      setValue('logoRemoved', false)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (company?.logoUrl) {
      setPreview(company.logoUrl)
    }
  }, [company])

  const selectingSubmit = type === 'create' ? createSubmit : updateSubmit

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(selectingSubmit)}>
      <Stack spacing={2} alignItems="center">
        <Box
          component="img"
          src={preview || placeholder}
          alt="Company logo"
          sx={{
            width: '100%',
            height: '100%',
            maxWidth: 560,
            maxHeight: 370,
            objectFit: 'cover',
            borderRadius: 2,
          }}
        />
        <Stack flexDirection="row" width="100%" justifyContent="space-evenly">
          <Button variant="contained" onClick={() => fileRef.current?.click()}>
            Upload Avatar
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: 'var(--color-red)' }}
            onClick={() => {
              setPreview('')
              setValue('logoRemoved', true)
              if (fileRef.current) {
                fileRef.current.value = ''
              }
            }}
            disabled={!preview}
          >
            Remove Logo
          </Button>
        </Stack>

        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        <Stack spacing={2} width="100%">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Name"
                fullWidth
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <TextField
                label="Service"
                fullWidth
                {...field}
                error={!!errors.service}
                helperText={errors.service?.message}
              />
            )}
          />

          <Controller
            name="capital"
            control={control}
            render={({ field }) => (
              <TextField
                label="capital"
                type="number"
                fullWidth
                {...field}
                error={!!errors.capital}
                helperText={errors.capital?.message}
              />
            )}
          />

          <Button
            type="button"
            variant="outlined"
            color={company?.deletedAt ? 'success' : 'error'}
            onClick={company?.deletedAt ? recoverSubmit : deleteSubmit}
          >
            {company?.deletedAt ? 'Restore Company' : 'Delete Company'}
          </Button>

          <Button type="submit" variant="contained">
            {type === 'create' ? 'Create' : 'Update'}
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export { CompanyForm }
