import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Container, Grid, LinearProgress, Pagination } from '@mui/material'

import { getCompanies } from '@/api/companies'
import { NoDataLabel } from '@/components/no-data-label'
import { SortingPanel } from '@/components/sorting-panel/sorting-panel'
import { DEFAULT_PAGINATION_TAKE } from '@/constants'
import { useDebounce } from '@/hooks/useDebounce.hook'
import { TCompany } from '@/types/company.types'

const Companies = () => {
  const [companies, setCompanies] = useState<TCompany[]>([])
  const [loading, setLoading] = useState(true)
  const [totalGames, setTotalGames] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()

  const filters = {
    name: searchParams.get('name') || '',
    sortField: searchParams.get('sortField') || 'name',
    sortDirection: (searchParams.get('sortDirection') as 'asc' | 'desc') || 'asc',
    page: Number(searchParams.get('page')) || 1,
  }

  const page = Number(searchParams.get('page')) || 1

  const fetchData = async (pageToUse = page) => {
    try {
      setLoading(true)

      const { data } = await getCompanies({
        ...filters,
        page: pageToUse,
        limit: DEFAULT_PAGINATION_TAKE,
      })

      const [companies, total] = data

      setCompanies(companies)
      setTotalGames(total)
    } catch (err) {
      toast(`Error loading companies: ${(err as any).message}`, { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const debouncedFetch = useDebounce({ debounceTimeout: 500, handler: fetchData })

  const handlePageChange = (newPage = 1, withDebounce = false) => {
    const params = Object.fromEntries(searchParams.entries())

    setSearchParams({
      ...params,
      page: newPage.toString(),
    })
    ;(withDebounce ? debouncedFetch : fetchData)(newPage)
  }

  useEffect(() => {
    fetchData(page)
  }, [searchParams])

  const renderContent = () => {
    if (loading) {
      return <LinearProgress />
    }

    if (!companies?.length) {
      return <NoDataLabel />
    }
    return (
      <Grid gap={2} display="grid" width="100%" minHeight="400px">
        <Grid gridTemplateColumns={'repeat(3, 1fr)'} gap={2} display="grid" justifyItems="center">
          {companies.map((company) => (
            <div key={company.id}>
              <div>{company.name}</div>
              <div>{company.id}</div>
              <div>{company.capital}</div>
            </div>
          ))}
        </Grid>
      </Grid>
    )
  }

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <SortingPanel
        filters={filters}
        setFilters={(newFilters) => {
          setSearchParams({
            ...newFilters,
          })
        }}
      />

      {renderContent()}

      <Pagination
        count={Math.ceil(totalGames / DEFAULT_PAGINATION_TAKE)}
        page={page}
        onChange={(_, value) => handlePageChange(value)}
      />
    </Container>
  )
}

export { Companies }
