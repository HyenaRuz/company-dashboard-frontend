import { ButtonProps, Button as MuiButton } from '@mui/material'

type TProps = ButtonProps
const Button = ({ children, sx, ...props }: TProps) => {
  return (
    <MuiButton variant="contained" sx={{ backgroundColor: 'var(--color-brand)', ...sx }} {...props}>
      {children}
    </MuiButton>
  )
}

export { Button }
