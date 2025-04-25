import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Container, Grid, LinearProgress, Typography } from '@mui/material'
import { BarChart } from '@mui/x-charts'

import { getCompanies } from '@/api/companies'
import { LineChart } from '@/components/charts/line-chart'
import { TCompany } from '@/types/company.types'

const Home = () => {
  const [data, setData] = useState<TCompany[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)

      const { data } = await getCompanies({
        allCompanies: true,
        sortDirection: 'asc',
        sortField: 'createdAt',
      })

      const [companies, total] = data

      setTotal(total)
      setData(companies)
    } catch (error) {
      toast(`Error loading companies: ${(error as any).message}`, { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderContent = () => {
    if (loading) {
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
              data: data.map((item) => `(${item.id}) - ${item.name}`),
              label: '(ID) Companies',
            },
          ]}
          series={[{ data: [...data.map((item) => item.capital)] }]}
          height={300}
          yAxis={[
            {
              label: 'Capital ($)',
              width: 60,
            },
          ]}
        />
        <LineChart data={data} />
        <LineChart data={data} param="updatedAt" />
      </Grid>
    )
  }

  return <Container>{renderContent()}</Container>
}

export { Home }
