import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Container, Grid, LinearProgress, Pagination } from '@mui/material'

import { getCompanies } from '@/api/companies'
import { CompanyCard } from '@/components/company-card'
import { CompanyForm } from '@/components/forms/company-form'
import { SortingPanel } from '@/components/sorting-panel/sorting-panel'
import { Modal } from '@/components/ui/modal'
import { DEFAULT_PAGINATION_TAKE } from '@/constants'
import { useDebounce } from '@/hooks/useDebounce.hook'
import { TCompany } from '@/types/company.types'

const Companies = () => {
  const [companies, setCompanies] = useState<TCompany[]>([])
  const [loading, setLoading] = useState(true)
  const [totalGames, setTotalGames] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams()
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<TCompany | null>(null)

  const closeModal = () => {
    setFormModalOpen(false)
    setSelectedCompany(null)
  }

  const filters = {
    name: searchParams.get('name') || '',
    sortField: searchParams.get('sortField') || 'name',
    sortDirection: (searchParams.get('sortDirection') as 'asc' | 'desc') || 'asc',
    page: Number(searchParams.get('page')) || 1,
    createdAt: searchParams.get('createdAt') || '',
  }

  const page = Number(searchParams.get('page')) || 1

  const fetchData = async (pageToUse = page) => {
    try {
      setLoading(true)

      const { data } = await getCompanies({
        ...filters,
        allCompanies: false,
        page: pageToUse,
        limit: DEFAULT_PAGINATION_TAKE,
      })

      setSelectedCompany(null)

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

    return (
      <Grid gap={2} display="grid" width="100%" minHeight="400px">
        <Grid
          gridTemplateColumns={{ xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
          gap={2}
          display="grid"
          justifyItems="center"
        >
          <CompanyCard addCompany onClick={() => setFormModalOpen(true)} />
          {companies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              refreshData={fetchData}
              onClick={() => setFormModalOpen(true)}
              setSelectedCompany={setSelectedCompany}
            />
          ))}
        </Grid>
      </Grid>
    )
  }

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          px: { xs: 0, sm: 2, md: 3 },
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

      <Modal open={formModalOpen} onClose={closeModal}>
        <CompanyForm
          onClose={closeModal}
          reloadData={fetchData}
          company={selectedCompany}
          type={selectedCompany ? 'update' : 'create'}
        />
      </Modal>
    </>
  )
}

export { Companies }
