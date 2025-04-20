import { useState } from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import EditDocumentIcon from '@mui/icons-material/EditDocument'
import { Box, Card, IconButton, Stack } from '@mui/material'

import placeholder from '@/assets/placeholder.png'
import { TCompany } from '@/types/company.types'

import { Popover } from '../popover'
import { Button } from '../ui/button'
import { InfoItem } from '../ui/info-item'

const CompanyCard = ({
  addCompany,
  company,
  onClick,
}: {
  addCompany?: boolean
  company?: TCompany
  onClick?: () => void
}) => {
  const [userControlsAnchorEl, setUserControlsAnchorEl] = useState<HTMLButtonElement | null>(null)

  return (
    <Stack width="100%" position="relative">
      <Box
        sx={{
          position: 'absolute',
          top: -5,
          right: { xs: -10, sm: -10 },
          left: { xs: 'auto', sm: 'auto' },
          zIndex: 10,
        }}
      >
        <IconButton
          onClick={(e) => {
            setUserControlsAnchorEl(e.currentTarget)
          }}
          size="small"
          sx={{
            borderRadius: '50%',
          }}
        >
          <EditDocumentIcon fontSize="medium" />
        </IconButton>
      </Box>

      <Card
        sx={{
          width: '100%',
          borderRadius: 3,
          height: 250,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#fff',
          cursor: 'pointer',
          transition: '0.2s',
          '&:hover': {
            backgroundColor: '#2c2c2e',
          },
        }}
      >
        {addCompany && (
          <Stack width={'100%'} height="100%" justifyContent="center" alignItems="center" gap={2}>
            <IconButton
              sx={{ borderRadius: '50%', width: '64px', height: '64px' }}
              onClick={onClick}
            >
              <AddCircleOutlineIcon fontSize="large" sx={{ width: '64px', height: '64px' }} />
            </IconButton>
          </Stack>
        )}

        {company && (
          <>
            <Box
              component="img"
              src={company.logoUrl || placeholder}
              alt="Company logo"
              sx={{
                width: '100%',
                height: '90px',
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />

            <Stack gap={0.5}>
              <InfoItem label="Name" data={company.name} />
              <InfoItem label="Capital" data={company.capital} />
              <InfoItem label="Service" data={company.service} />
              <InfoItem label="ID" data={company.id} />
            </Stack>
          </>
        )}
      </Card>

      <Popover anchorEl={userControlsAnchorEl} onClose={() => setUserControlsAnchorEl(null)}>
        <Stack gap={2}>
          <Button variant="contained" sx={{ gap: 2 }}>
            Edit
          </Button>
          <Button variant="contained" sx={{ gap: 2, backgroundColor: 'var(--color-red)' }}>
            Delite
          </Button>
        </Stack>
      </Popover>
    </Stack>
  )
}

export { CompanyCard }
