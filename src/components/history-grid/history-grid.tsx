import { useState } from 'react'

import { Box, Stack, Typography } from '@mui/material'
import { GridPaginationModel } from '@mui/x-data-grid'

import { THistory } from '@/types/history.type'

import { GenericDataGrid } from '../data-grid'
import historyColums from '../data-grid/lib/constants/history-colums'

const HistoryGrid = ({ data }: { data: THistory[] }) => {
  // const [loading, setLoading] = useState(true)
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 17,
  })

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
      <Typography variant="h4">Action History</Typography>
      <Box sx={{ width: '100%' }}>
        <GenericDataGrid<THistory>
          rows={data}
          columns={historyColums}
          total={data.length}
          rowIdKey="id"
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
        />
      </Box>
    </Stack>
  )
}

export { HistoryGrid }
