import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Box, Stack, Typography } from '@mui/material'
import {
  GridFilterModel,
  GridPaginationModel,
  GridRowParams,
  GridSortModel,
} from '@mui/x-data-grid'

import { getAllUsers } from '@/api/account'
import { GenericDataGrid } from '@/components/data-grid/data-grid'
import userColums from '@/components/data-grid/lib/constants/user-colums'
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

  const filters = filterModel.items
    .filter((item) => !!item.value)
    .reduce(
      (acc, item) => {
        acc[item.field] = item.value
        return acc
      },
      {} as Record<string, string>,
    )

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

  const handleRowClick = (params: GridRowParams<TAccount>) => {
    const row = params.row

    navigate(`${row.id}`)
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
          width: '100%',
        }}
      >
        <Typography variant="h3">Manage Users</Typography>

        <Box sx={{ width: '100%' }}>
          <GenericDataGrid<TAccount>
            rows={users}
            total={total}
            columns={userColums}
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
      </Stack>
    </>
  )
}

export { Users }
