import { FC } from 'react'

import { Autocomplete, AutocompleteProps, Checkbox, TextField } from '@mui/material'

import { TOption } from '@/types/option.types'

type TProps = Partial<Omit<AutocompleteProps<TOption, true, any, any>, 'value'>> & {
  options: TOption[]
  label: string
  value?: string[]
  error?: boolean
  onChange: (value: string[]) => void
}

const MultipleAutocomplete: FC<TProps> = ({
  options,
  value,
  onChange,
  renderInput,
  error,
  label,
  ...rest
}) => {
  return (
    <Autocomplete
      multiple
      options={options}
      disableCloseOnSelect
      getOptionLabel={(option) => (option as TOption).title}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props
        return (
          <li key={key} {...optionProps}>
            <Checkbox style={{ marginRight: 8 }} checked={selected} />
            {option.title}
          </li>
        )
      }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={label} error={error} />
      )}
      value={options.filter((option) => (value || []).some((item) => item === option.value))}
      onChange={(_, newValue) => onChange((newValue as TOption[]).map((option) => option.value))}
      {...rest}
    />
  )
}

export { MultipleAutocomplete }
