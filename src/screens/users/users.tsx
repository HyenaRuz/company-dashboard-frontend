import { useEffect, useMemo, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Avatar, Box, Container, Stack, Typography } from '@mui/material'
import {
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRowParams,
  GridSortModel,
} from '@mui/x-data-grid'
import moment from 'moment'

import { getAllUsers } from '@/api/account'
import { GenericDataGrid } from '@/components/data-grid/data-grid'
import { TAccount } from '@/types/account.types'
import { TSorting } from '@/types/api.types'

const Users = () => {
  const [users, setUsers] = useState<TAccount[]>([])
  const [total, setTotal] = useState(0)
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] })
  const [sortModel, setSortModel] = useState<GridSortModel>([])
  //   const [loading, setLoading] = useState(true)
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 17,
  })

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

  const fetchUsers = async () => {
    try {
      //   setLoading(true)

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

      const { data } = await getAllUsers({
        ...sortParams,
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        ...filters,
      })

      const [users, total] = data

      setUsers(users)
      setTotal(total)
    } catch (error) {
      toast(`Error loading users: ${(error as any).message}`, { type: 'error' })
    } finally {
      //   setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [paginationModel, filterModel, sortModel])

  const columns = useMemo<GridColDef<TAccount>[]>(
    () => [
      { field: 'id', headerName: 'ID', flex: 0.5 },
      {
        field: 'avatarUrl',
        headerName: 'Logo',
        renderCell: (params) => (
          <Stack width="100%" height="100%" justifyContent="center" alignItems="center">
            <Avatar src={params.row.avatarUrl} />
          </Stack>
        ),
        sortable: false,
        filterable: false,
        width: 60,
      },
      { field: 'username', headerName: 'Username', flex: 1, type: 'string' },
      { field: 'email', headerName: 'Email', flex: 1, type: 'string' },
      {
        field: 'role',
        headerName: 'Role',
        flex: 1,
      },
      {
        field: '_count',
        headerName: 'Companies',
        flex: 1,
        renderCell: (params) => params.row._count?.companies ?? 0,
        sortable: false,
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        flex: 1,
        renderCell: (params) => moment(params.row.createdAt).format('DD.MM.YYYY HH:mm'),
      },
      {
        field: 'deletedAt',
        headerName: 'Active',
        type: 'boolean',
        valueGetter: (value) => !value,
      },
    ],
    [],
  )

  const handleRowClick = (params: GridRowParams<TAccount>) => {
    const row = params.row

    navigate(`${row.id}`)
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
          width: '100%',
        }}
      >
        <Typography variant="h3">Manage Users</Typography>

        <Box sx={{ width: '100%' }}>
          <GenericDataGrid<TAccount>
            rows={users}
            columns={columns}
            total={total}
            rowIdKey="id"
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            handleFilterChange={(model) => setFilterModel(model)}
            handleSortChange={(model) => setSortModel(model)}
            onRowClick={handleRowClick}
          />
        </Box>

        <Box>
          <Outlet />
        </Box>
      </Container>
    </>
  )
}

export { Users }
