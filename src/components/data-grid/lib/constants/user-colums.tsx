import { Avatar, Stack } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import moment from 'moment'

import { TAccount } from '@/types/account.types'

const userColums: GridColDef<TAccount>[] = [
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
    filterable: false,
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
]

export default userColums
