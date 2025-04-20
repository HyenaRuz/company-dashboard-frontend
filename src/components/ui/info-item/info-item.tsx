import { ReactNode } from 'react'

import { Divider, Grid, Typography } from '@mui/material'

type TProps = {
  label: string
  data: string | number | ReactNode
  withDivider?: boolean
}

const InfoItem = ({ label, data, withDivider = true }: TProps) => {
  const isEmpty = Array.isArray(data) ? !data.length : !data
  const isJsx = typeof data === 'object'

  return (
    <Grid container flexDirection="column" gap={0.5}>
      <Grid container alignItems="center" gap={0.5}>
        <Typography>
          <span style={{ color: 'var(--color-inactive)' }}>{label}:</span>{' '}
          {!isJsx && (isEmpty ? '-' : data)}
        </Typography>
        {isJsx && data}
      </Grid>
      {withDivider && <Divider sx={{ background: 'var(--color-l3)' }} />}
    </Grid>
  )
}

export { InfoItem }
