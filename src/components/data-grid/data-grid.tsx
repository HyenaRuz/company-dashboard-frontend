import {
  GridColDef,
  GridFilterModel,
  GridPaginationModel,
  GridRowParams,
  GridSortModel,
  GridValidRowModel,
  DataGrid as MuiDataGrid,
} from '@mui/x-data-grid'

type TProps<T extends GridValidRowModel> = {
  rows: T[]
  columns: GridColDef<T>[]
  rowIdKey: keyof T
  total: number
  paginationModel: GridPaginationModel
  setPaginationModel: (model: GridPaginationModel) => void
  handleFilterChange?: (model: GridFilterModel) => void
  handleSortChange?: (model: GridSortModel) => void
  onRowClick?: (params: GridRowParams<T>) => void
}

const GenericDataGrid = <T extends GridValidRowModel>({
  rows,
  columns,
  rowIdKey,
  total,
  paginationModel,
  onRowClick,
  setPaginationModel,
  handleFilterChange,
  handleSortChange,
}: TProps<T>) => {
  return (
    <MuiDataGrid
      rows={rows}
      columns={columns}
      getRowId={(row) => row[rowIdKey] as any}
      rowCount={total}
      paginationModel={paginationModel}
      paginationMode="server"
      onPaginationModelChange={setPaginationModel}
      onRowClick={onRowClick}
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
