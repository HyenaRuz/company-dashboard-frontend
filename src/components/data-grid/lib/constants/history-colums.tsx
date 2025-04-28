import { GridColDef } from '@mui/x-data-grid'
import moment from 'moment'

import { THistory } from '@/types/history.type'

const historyColums: GridColDef<THistory>[] = [
  { field: 'id', headerName: 'ID', flex: 0.3, align: 'center', headerAlign: 'center' },
  {
    field: 'createdAt',
    headerName: 'Created At',
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => moment(params.row.createdAt).format('DD.MM.YYYY HH:mm'),
  },
  {
    field: 'actingAccountId',
    headerName: 'Acting Account',
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'targetAccountId',
    headerName: 'Target Account',
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'objectCompanyId',
    headerName: 'Company',
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'objectAccountId',
    headerName: 'Account',
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'objectType',
    headerName: 'Object Type',
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'ip',
    headerName: 'IP Address',
    flex: 0.4,
    align: 'center',
    headerAlign: 'center',
  },
]

export default historyColums
