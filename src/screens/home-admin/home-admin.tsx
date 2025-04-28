import { toast } from 'react-toastify'

import { Grid, LinearProgress, Stack, Typography } from '@mui/material'

import { LineChart } from '@/components/charts/line-chart'
import { useAllUsers, useCompanies } from '@/hooks/query-client'

const HomeAdmin = () => {
  const {
    data: usersData,
    error: usersError,
    isLoading: loadingUsers,
  } = useAllUsers({
    sortDirection: 'asc',
    sortField: 'createdAt',
  })

  if (usersError) {
    toast(`Error loading users: ${(usersError as any).message}`, { type: 'error' })
  }

  const [users = [], totalUsers = 0] = usersData ?? []

  const {
    data,
    error,
    isLoading: loadingCompanies,
  } = useCompanies({
    allCompanies: true,
    sortDirection: 'asc',
    sortField: 'createdAt',
  })

  if (error) {
    toast(`Error loading companies: ${(error as any).message}`, { type: 'error' })
  }

  const [companies = [], totalCompanies = 0] = data ?? []

  const renderContent = () => {
    return (
      <Grid gap={2} display="grid">
        <Grid gridTemplateColumns={'repeat(3, 1fr)'} gap={2} display="grid"></Grid>

        <Typography variant="h3">Total Users: {totalUsers}</Typography>
        {loadingUsers ? (
          <LinearProgress />
        ) : (
          <>
            <LineChart data={users} />
            <LineChart data={users} param="updatedAt" />
          </>
        )}

        <Typography variant="h3">Total Сompanies: {totalCompanies}</Typography>

        {loadingCompanies ? (
          <LinearProgress />
        ) : (
          <>
            <LineChart data={companies} />
            <LineChart data={companies} param="updatedAt" />
          </>
        )}
      </Grid>
    )
  }

  return <Stack>{renderContent()}</Stack>
}

export { HomeAdmin }
