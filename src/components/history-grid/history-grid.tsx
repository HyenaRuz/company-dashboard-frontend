import { useMemo, useState } from 'react'

import { Box, Container, Typography } from '@mui/material'
import { GridColDef, GridPaginationModel } from '@mui/x-data-grid'
import moment from 'moment'

import { THistory } from '@/types/history.type'

import { GenericDataGrid } from '../data-grid'

const HistoryGrid = ({ data }: { data: THistory[] }) => {
  // const [loading, setLoading] = useState(true)
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 17,
  })

  const columns = useMemo<GridColDef<THistory>[]>(
    () => [
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
    ],
    [data],
  )

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
      <Typography variant="h4">Action History</Typography>
      <Box sx={{ width: '100%' }}>
        <GenericDataGrid<THistory>
          rows={data}
          columns={columns}
          total={data.length}
          rowIdKey="id"
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
      </Box>
    </Container>
  )
}

export { HistoryGrid }
