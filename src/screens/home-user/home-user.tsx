import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { Grid, LinearProgress, Stack, Typography } from '@mui/material'
import { BarChart } from '@mui/x-charts'

import { LineChart } from '@/components/charts/line-chart'
import { useCompanies } from '@/hooks/query-client'

const HomeUser = () => {
  const { data, error, isLoading } = useCompanies({
    allCompanies: true,
    sortDirection: 'asc',
    sortField: 'createdAt',
  })

  useEffect(() => {
    if (error) {
      toast(`Error loading companies: ${(error as any).message}`, { type: 'error' })
    }
  }, [error])

  const [companies = [], total = 0] = data ?? []

  const renderContent = () => {
    if (isLoading) {
      return <LinearProgress />
    }

    return (
      <Grid gap={2} display="grid">
        <Grid gridTemplateColumns={'repeat(3, 1fr)'} gap={2} display="grid"></Grid>

        <Typography variant="h3">Total companies: {total}</Typography>

        <BarChart
          xAxis={[
            {
              scaleType: 'band',
              data: companies.map((item) => `(${item.id}) - ${item.name}`),
              label: '(ID) Companies',
            },
          ]}
          series={[{ data: [...companies.map((item) => item.capital)] }]}
          height={300}
          yAxis={[
            {
              label: 'Capital ($)',
              width: 60,
            },
          ]}
        />
        <LineChart data={companies} />
        <LineChart data={companies} param="updatedAt" />
      </Grid>
    )
  }

  return <Stack>{renderContent()}</Stack>
}

export { HomeUser }
