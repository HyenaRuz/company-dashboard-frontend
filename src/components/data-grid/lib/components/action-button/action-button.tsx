import { useState } from 'react'
import { toast } from 'react-toastify'

import { Check, Save } from '@mui/icons-material'
import { Box, CircularProgress, Fab } from '@mui/material'
import { green } from '@mui/material/colors'
import { GridRenderCellParams, GridValidRowModel } from '@mui/x-data-grid'

type TProps<T extends GridValidRowModel> = {
  params: GridRenderCellParams<T>
  editedRows: Record<string, T>
  onSubmit: (row: T) => Promise<void>
  setEditedRows: React.Dispatch<React.SetStateAction<Record<string, T>>>
}

const ActionButton = <T extends GridValidRowModel>({
  params,
  editedRows,
  onSubmit,
  setEditedRows,
}: TProps<T>) => {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const rowId = String(params.id)
  const row = editedRows[rowId]

  const handleSubmit = async () => {
    if (!row) return

    setLoading(true)
    try {
      await onSubmit(row)
      setSuccess(true)
      
      setEditedRows((prev) => {
        const updatedRows = { ...prev }
        delete updatedRows[rowId]
        return updatedRows
      })
      
      setTimeout(() => setSuccess(false), 2000)
    } catch (e) {
      toast(`Error: ${(e as any).message}`, { type: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      {success ? (
        <Fab size="small" sx={{ bgcolor: green[500], '&:hover': { bgcolor: green[700] } }}>
          <Check />
        </Fab>
      ) : (
        <Fab
          size="small"
          disabled={params.id !== row?.id || loading}
          onClick={handleSubmit}
          sx={{ bgcolor: green[500], '&:hover': { bgcolor: green[700] } }}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress size={40} sx={{ position: 'absolute', top: -6, left: -6, zIndex: 1 }} />
      )}
    </Box>
  )
}

export { ActionButton }