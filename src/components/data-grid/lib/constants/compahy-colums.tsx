import { Avatar, Stack } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import moment from 'moment'

import { TCompany } from '@/types/company.types'

const companyColums: GridColDef<TCompany>[] = [
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
  },
  {
    field: 'service',
    headerName: 'Service',
    flex: 0.5,
  },
  {
    field: 'capital',
    headerName: 'Capital',
    flex: 1,
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
    field: 'account',
    headerName: 'User Email',
    flex: 1,
    renderCell: (params) => params.row.account.email,
  },
  {
    field: 'deletedAt',
    headerName: 'Active',
    type: 'boolean',
    valueGetter: (value) => !value,
  },
]

export default companyColums
