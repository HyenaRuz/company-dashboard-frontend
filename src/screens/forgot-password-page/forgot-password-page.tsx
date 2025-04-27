import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Grid, Stack, TextField } from '@mui/material'

import { requestPasswordReset } from '@/api/auth'
import { Button } from '@/components/ui/button'

const ForgotPasswordPage = () => {
  const { control, handleSubmit } = useForm<{ email: string }>({
    defaultValues: { email: '' },
  })

  const [loading, setLoading] = useState(false)

  const onSubmit = async (email: { email: string }) => {
    setLoading(true)
    try {
      const { data } = await requestPasswordReset(email.email)

      console.log(data.previewUrl)
      toast.success('Reset link sent to your email.')
    } catch (error) {
      toast.error('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Grid
      minHeight="100vh"
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: '300px' }}>
        <Stack spacing={2}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <TextField {...field} label="Email" fullWidth />}
          />
          <Button type="submit" variant="contained" disabled={loading}>
            Send Reset Link
          </Button>
        </Stack>
      </form>
    </Grid>
  )
}

export { ForgotPasswordPage }
