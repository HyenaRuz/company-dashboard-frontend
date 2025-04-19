// src/components/ui/FormTextField.tsx
import { TextField as MuiTextField, TextFieldProps } from '@mui/material'

const TextField = ({ ...props }: TextFieldProps) => {
  return <MuiTextField {...props} />
}

export { TextField }
