import { useEffect, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select } from '@mui/material'

import { ECompanySorting } from '@/enums/company-sorting.enum'
import { TOption } from '@/types/option.types'
import { SortingParams } from '@/types/sorting.type'

import { TextField } from '../ui/text-field'

const sortingOptions: TOption[] = [
  { title: 'Name', value: ECompanySorting.NAME },
  { title: 'Service', value: ECompanySorting.SERVICE },
  { title: 'Capital', value: ECompanySorting.CAPITAL },
  { title: 'Create', value: ECompanySorting.CREATEDAT },
]

const SortingPanel = ({
  filters,
  setFilters,
}: {
  filters: SortingParams
  setFilters: (filters: SortingParams) => void
}) => {
  const defaultValues = useMemo<SortingParams>(
    () => ({
      name: '',
      sortDirection: 'asc' as 'asc' | 'desc',
      sortField: sortingOptions[0].value,
    }),
    [],
  )

  const {
    control,
    getValues,
    // reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues,
  })

  useEffect(() => {
    // При смене URL обновляем поля
    setValue('name', filters.name)
    setValue('sortDirection', filters.sortDirection)
    setValue('sortField', filters.sortField)
  }, [filters, setValue])

  const handlePageChange = () => {
    const { name, sortDirection, sortField } = getValues()
    setFilters({ name, sortDirection, sortField })
  }

  return (
    <form style={{ width: '100%' }}>
      <Grid container gap={1} alignItems="center">
        <Controller
          name="name"
          control={control}
          render={({ field: { ref, onChange, ...field } }) => (
            <TextField
              variant="outlined"
              label="Name"
              error={!!errors.name?.message}
              sx={{ flex: 1 }}
              size="small"
              onChange={(e) => {
                const value = e.target.value
                onChange(value)
                handlePageChange()
              }}
              {...field}
            />
          )}
        />

        <Grid container flexWrap="nowrap" gap={2} flex={0.8} alignItems="center">
          <Controller
            name="sortField"
            control={control}
            render={({ field: { ref, onChange, ...rest } }) => (
              <FormControl fullWidth>
                <InputLabel>Sort by</InputLabel>
                <Select
                  label="Sort by"
                  onChange={(e) => {
                    const value = e.target.value
                    onChange(value)
                    handlePageChange()
                  }}
                  size="small"
                  error={!!errors.sortField?.message}
                  {...rest}
                >
                  {sortingOptions.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          <Controller
            name="sortDirection"
            control={control}
            render={({ field: { onChange, value } }) => (
              <IconButton
                sx={{ width: 40, height: 40 }}
                onClick={() => {
                  onChange(value === 'asc' ? 'desc' : 'asc')
                  handlePageChange()
                }}
              >
                <KeyboardDoubleArrowDownIcon
                  sx={{
                    transition: 'all 0.3s',
                    transform: `rotate(${value === 'asc' ? 180 : 0}deg)`,
                  }}
                />
              </IconButton>
            )}
          />
        </Grid>
      </Grid>
    </form>
  )
}

export { SortingPanel }
