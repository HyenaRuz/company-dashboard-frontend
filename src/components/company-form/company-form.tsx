import { useEffect, useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Stack } from '@mui/material'
import * as yup from 'yup'

import { createCompany, updateCompany } from '@/api/companies'
import placeholder from '@/assets/placeholder.png'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'
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
}

type TFormUpdate = TForm & {
  logoRemoved: boolean
}

type TProps = {
  onClose: () => void
  reloadData: () => void
  company?: TCompany | null
  type?: 'create' | 'update'
}

const CompanyForm = ({ onClose, reloadData, company, type = 'create' }: TProps) => {
  const [preview, setPreview] = useState<string | null>(null)

  const fileRef = useRef<HTMLInputElement>(null)
  const defaultValues = {
    name: company?.name || '',
    service: company?.service || '',
    capital: `${company?.capital}` || '',
  }

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TForm | TFormUpdate>({
    defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const createSubmit: SubmitHandler<TForm> = async (payload: TForm) => {
    try {
      const file = fileRef.current?.files?.[0]

      const formData = new FormData()

      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value)
        }
      })

      if (file) formData.append('logo', file)

      await createCompany(formData)

      onClose()
      reloadData()

      toast('You have registered successfully.', { type: 'success' })
    } catch (err) {
      toast(`Error: ${(err as any).message}`, { type: 'error' })
    }
  }
  const updateSubmit: SubmitHandler<TForm> = async (payload: TForm) => {
    try {
      const file = fileRef.current?.files?.[0]

      const formData = new FormData()

      Object.entries(payload).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value)
        }
      })

      if (file) formData.append('logo', file)

      await updateCompany(company?.id!, formData)

      onClose()
      reloadData()

      toast('You have registered successfully.', { type: 'success' })
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
      setValue('logoRemoved', false)
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if (company?.logoUrl) {
      setPreview(company.logoUrl)
    }
  }, [company])

  const logoRemoved = watch('logoRemoved')

  return (
    <form
      onSubmit={handleSubmit(type === 'create' ? createSubmit : updateSubmit)}
      style={{ width: '100%' }}
    >
      <Stack spacing={2} alignItems="center">
        <Box
          component="img"
          src={preview || placeholder}
          alt="Company logo"
          sx={{
            width: '100%',
            height: '100%',
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

          <Button type="submit" variant="contained">
            {type === 'create' ? 'Create' : 'Update'}
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export { CompanyForm }
