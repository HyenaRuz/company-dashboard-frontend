import { ButtonProps, Button as MuiButton } from '@mui/material'

const Button = ({ children, ...props }: ButtonProps) => {
  return <MuiButton {...props}>{children}</MuiButton>
}

export { Button }
