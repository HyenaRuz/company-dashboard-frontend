import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Grid, LinearProgress, Pagination, Stack } from '@mui/material'

import { CompanyCard } from '@/components/company-card'
import { CompanyForm } from '@/components/forms/company-form'
import { SortingPanel } from '@/components/sorting-panel/sorting-panel'
import { Modal } from '@/components/ui/modal'
import { DEFAULT_PAGINATION_TAKE } from '@/constants'
import { useCompanies } from '@/hooks/query-client'
import { TCompany } from '@/types/company.types'

const UserCompanies = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<TCompany | null>(null)

  const closeModal = () => {
    setFormModalOpen(false)
    setSelectedCompany(null)
  }
  const filters = useMemo(() => {
    return {
      name: searchParams.get('name') || '',
      sortField: searchParams.get('sortField') || 'name',
      sortDirection: (searchParams.get('sortDirection') as 'asc' | 'desc') || 'asc',
      page: Number(searchParams.get('page')) || 1,
      createdAt: searchParams.get('createdAt') || '',
    }
  }, [searchParams])

  const page = Number(searchParams.get('page')) || 1

  const { data, error, isLoading, refetch } = useCompanies({
    ...filters,
    allCompanies: false,
    page,
    limit: DEFAULT_PAGINATION_TAKE,
  })

  if (error) {
    toast(`Error loading companies: ${(error as any).message}`, { type: 'error' })
  }

  const [companies = [], total = 0] = data ?? []

  const handlePageChange = (newPage = 1) => {
    const params = { ...filters, page: newPage.toString() }
    setSearchParams(params)
  }

  const renderContent = () => {
    if (isLoading) {
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
              refreshData={refetch}
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
      <Stack
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
          count={Math.ceil(total / DEFAULT_PAGINATION_TAKE)}
          page={page}
          onChange={(_, value) => handlePageChange(value)}
        />
      </Stack>

      <Modal open={formModalOpen} onClose={closeModal}>
        <CompanyForm
          onClose={closeModal}
          reloadData={refetch}
          company={selectedCompany}
          type={selectedCompany ? 'update' : 'create'}
        />
      </Modal>
    </>
  )
}

export { UserCompanies }
