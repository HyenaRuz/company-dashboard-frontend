import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { Avatar, Box, Container, Stack, Typography } from '@mui/material'
import { GridColDef, GridFilterModel, GridPaginationModel, GridSortModel } from '@mui/x-data-grid'
import moment from 'moment'

import { getAllCompanies, updateCompany } from '@/api/companies'
import { GenericDataGrid } from '@/components/data-grid/data-grid'
import { TCompany } from '@/types/company.types'
import { TSorting } from '@/types/api.types'

const CompaniesDashboard = () => {
  const [companies, setCompanies] = useState<TCompany[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 17,
  })
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] })
  const [sortModel, setSortModel] = useState<GridSortModel>([])

  const fetchCompanies = async () => {
    try {
      const sortParams = getSortParams(sortModel)

      const filters = filterModel.items
        .filter((item) => !!item.value)
        .reduce(
          (acc, item) => {
            acc[item.field] = item.value
            return acc
          },
          {} as Record<string, string>,
        )

      const { data } = await getAllCompanies({
        ...sortParams,
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        ...filters,
      })

      const [companies, total] = data

      setCompanies(companies)
      setTotal(total)
    } catch (err) {
      toast(`Error loading companies: ${(err as any).message}`, { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const columns = useMemo<GridColDef<TCompany>[]>(
    () => [
      { field: 'id', headerName: 'ID', flex: 0.1, align: 'center' },
      {
        field: 'logoUrl',
        headerName: 'Logo',
        renderCell: (params) => (
          <Stack width="100%" height="100%" justifyContent="center" alignItems="center">
            <Avatar src={params.row.logoUrl} />{' '}
          </Stack>
        ),
        sortable: false,
        filterable: false,
        width: 60,
      },
      {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        editable: true,
        type: 'string',
      },
      {
        field: 'service',
        headerName: 'Service',
        flex: 0.5,
        editable: true,
        type: 'string',
      },
      {
        field: 'capital',
        headerName: 'Capital',
        flex: 1,
        editable: true,
        type: 'number',
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        flex: 1,
        renderCell: (params) => moment(params.row.createdAt).format('DD.MM.YYYY HH:mm'),
      },
      {
        field: 'updatedAt',
        headerName: 'Updated At',
        flex: 1,
        renderCell: (params) => moment(params.row.updatedAt).format('DD.MM.YYYY HH:mm'),
      },
      {
        field: 'deletedAt',
        headerName: 'Deleted At',
        flex: 1,
        renderCell: (params) => {
          const value = params.value
          return value && moment(value).isValid() ? moment(value).format('DD.MM.YYYY HH:mm') : '-'
        },
      },
      {
        field: 'accountId',
        headerName: 'User ID',
        flex: 0.5,
        align: 'center',
      },
    ],
    [],
  )

  const getSortParams = (model: GridSortModel): Partial<TSorting> => {
    if (!model.length || !model[0].sort) return {}

    const { field, sort } = model[0]
    if (sort !== 'asc' && sort !== 'desc') return {}

    return {
      sortField: field,
      sortDirection: sort,
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [paginationModel, filterModel, sortModel])
  return (
    <Container
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
          columns={columns}
          total={total}
          rowIdKey="id"
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          onSubmit={async (updatedCompany) => {
            await updateCompany(updatedCompany.id, updatedCompany)
            fetchCompanies()
          }}
          handleFilterChange={(model) => setFilterModel(model)}
          handleSortChange={(model) => setSortModel(model)}
        />
      </Box>
    </Container>
  )
}

export { CompaniesDashboard }
