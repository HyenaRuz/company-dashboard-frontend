import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Box, Stack, Typography } from '@mui/material'
import {
  GridFilterModel,
  GridPaginationModel,
  GridRowParams,
  GridSortModel,
} from '@mui/x-data-grid'

import { GenericDataGrid } from '@/components/data-grid/data-grid'
import companyColums from '@/components/data-grid/lib/constants/compahy-colums'
import { useCompanies } from '@/hooks/query-client'
import { TSorting } from '@/types/api.types'
import { TCompany } from '@/types/company.types'

const CompaniesDashboard = () => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 17,
  })
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] })
  const [sortModel, setSortModel] = useState<GridSortModel>([])

  const navigate = useNavigate()

  const getSortParams = (model: GridSortModel): Partial<TSorting> => {
    if (!model.length || !model[0].sort) return {}

    const { field, sort } = model[0]
    if (sort !== 'asc' && sort !== 'desc') return {}

    return {
      sortField: field,
      sortDirection: sort,
    }
  }

  const filters = filterModel.items
    .filter((item) => !!item.value)
    .reduce(
      (acc, item) => {
        acc[item.field] = item.value
        return acc
      },
      {} as Record<string, string>,
    )

  const handleRowClick = (params: GridRowParams<TCompany>) => {
    const row = params.row

    navigate(`${row.id}`)
  }

  const { data, error } = useCompanies({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
    ...filters,
    ...getSortParams(sortModel),
  })

  if (error) {
    toast(`Error loading companies: ${(error as any).message}`, { type: 'error' })
  }

  const [companies = [], total = 0] = data ?? []

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        px: { xs: 0, sm: 2, md: 3 },
      }}
    >
      <Typography variant="h3">Manage Companies</Typography>
      <Box sx={{ width: '100%' }}>
        <GenericDataGrid<TCompany>
          rows={companies}
          columns={companyColums}
          total={total}
          rowIdKey="id"
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          handleFilterChange={(model) => setFilterModel(model)}
          handleSortChange={(model) => setSortModel(model)}
          onRowClick={handleRowClick}
        />
      </Box>
    </Stack>
  )
}

export { CompaniesDashboard }
