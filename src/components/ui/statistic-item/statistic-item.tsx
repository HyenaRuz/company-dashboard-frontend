import { FC } from 'react'

import { Box, Card, Typography } from '@mui/material'

type TProps = {
  label: string
  value: string | number
}

const StatisticItem: FC<TProps> = ({ label, value }) => {
  return (
    <Box minWidth={200}>
      <Card variant="outlined">
        <Box padding={2}>
          <Typography textAlign="center" variant="h6" sx={{ color: 'text.secondary' }}>
            {label}
          </Typography>
          <Typography textAlign="center" variant="h5">
            {value}
          </Typography>
        </Box>
      </Card>
    </Box>
  )
}

export { StatisticItem }
