import { useState } from 'react'

import {
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRenderCellParams,
  GridSortModel,
  DataGrid as MuiDataGrid,
} from '@mui/x-data-grid'

import { ActionButton } from './lib/components/action-button'

type TProps<T> = {
  rows: T[]
  columns: GridColDef<T>[]
  rowIdKey: keyof T
  onSubmit: (row: T) => Promise<void>
  total: number
  paginationModel: GridPaginationModel
  setPaginationModel: (model: GridPaginationModel) => void
  handleFilterChange?: (model: GridFilterModel) => void
  handleSortChange?: (model: GridSortModel) => void
}

const GenericDataGrid = <T,>({
  rows,
  columns,
  rowIdKey,
  onSubmit,
  total,
  paginationModel,
  setPaginationModel,
  handleFilterChange,
  handleSortChange,
}: TProps<T>) => {
  const [editedRows, setEditedRows] = useState<Record<string, T>>({})

  return (
    <MuiDataGrid
      rows={rows}
      columns={[
        ...columns,
        {
          field: 'actions',
          headerName: 'Actions',
          type: 'actions',
          renderCell: (params: GridRenderCellParams) => (
            <ActionButton
              params={params}
              editedRows={editedRows}
              onSubmit={onSubmit}
              setEditedRows={setEditedRows}
            />
          ),
        },
      ]}
      getRowId={(row) => row[rowIdKey] as any}
      rowCount={total}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      processRowUpdate={(updatedRow, oldRow) => {
        if (JSON.stringify(updatedRow) !== JSON.stringify(oldRow)) {
          const key = String(updatedRow[rowIdKey])
          setEditedRows((prev) => ({ ...prev, [key]: updatedRow }))
        }
        return updatedRow
      }}
      sx={{
        border: 'none',
        color: 'text.primary',
        fontSize: '0.9rem',
        backgroundColor: 'rgba(24, 24, 24, 0.8)',
        borderRadius: '20px',
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: (theme) => theme.palette.primary.main,
          fontWeight: 'bold',
        },
        '& .MuiDataGrid-row:hover': {
          backgroundColor: (theme) => theme.palette.action.hover,
        },
        '& .MuiDataGrid-columnSeparator': {
          display: 'none',
        },
      }}
      filterMode="server"
      onFilterModelChange={handleFilterChange}
      sortingMode="server"
      onSortModelChange={handleSortChange}
    />
  )
}

export { GenericDataGrid }
