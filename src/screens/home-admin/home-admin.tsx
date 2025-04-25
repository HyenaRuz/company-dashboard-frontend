import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Container, Grid, LinearProgress, Typography } from '@mui/material'

import { getAllUsers } from '@/api/account'
import { getAllCompanies } from '@/api/companies'
import { LineChart } from '@/components/charts/line-chart'
import { TAccount } from '@/types/account.types'
import { TCompany } from '@/types/company.types'

const HomeAdmin = () => {
  const [users, setUsers] = useState<TAccount[]>([])
  const [totalUsers, setTotalUsers] = useState(0)
  const [companies, setCompanies] = useState<TCompany[]>([])
  const [totalCompanies, setTotalCompanies] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      setLoading(true)

      const { data: companiesData } = await getAllCompanies({
        allCompanies: true,
        sortDirection: 'asc',
        sortField: 'createdAt',
      })

      const [companies, totalCompanies] = companiesData

      setTotalCompanies(totalCompanies)
      setCompanies(companies)


      const { data: usersData } = await getAllUsers({
        sortDirection: 'asc',
        sortField: 'createdAt',
      })

      const [users, totalUsers] = usersData

      setTotalUsers(totalUsers)
      setUsers(users)
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

        <Typography variant="h3">Total Users: {totalUsers}</Typography>
        <LineChart data={users} />
        <LineChart data={users} param="updatedAt" />

        <Typography variant="h3">Total Сompanies: {totalCompanies}</Typography>
        <LineChart data={companies} />
        <LineChart data={companies} param="updatedAt" />
      </Grid>
    )
  }

  return <Container>{renderContent()}</Container>
}

export { HomeAdmin }
