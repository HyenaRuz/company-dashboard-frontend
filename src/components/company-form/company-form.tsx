import { useRef, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Stack } from '@mui/material'
import * as yup from 'yup'

import { createCompany } from '@/api/companies'
import placeholder from '@/assets/placeholder.png'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/ui/text-field'

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

const CompanyForm = ({ onClose, reloadData }: { onClose: () => void; reloadData: () => void }) => {
  const [preview, setPreview] = useState<string | null>(null)

  const fileRef = useRef<HTMLInputElement>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    defaultValues: {
      name: '',
      service: '',
      capital: '',
    },
    resolver: yupResolver(validationSchema),
  })

  const submit: SubmitHandler<TForm> = async (payload: TForm) => {
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
    <form onSubmit={handleSubmit(submit)} style={{ width: '100%' }}>
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

        <Button variant="contained" onClick={() => fileRef.current?.click()}>
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
            Create
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export { CompanyForm }
