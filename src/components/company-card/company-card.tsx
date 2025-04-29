import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import EditDocumentIcon from '@mui/icons-material/EditDocument'
import { Box, Card, IconButton, Stack } from '@mui/material'

import placeholder from '@/assets/placeholder.png'
import { EAppRoutes } from '@/enums/app-routes.enum'
import { useDeleteCompany } from '@/hooks/query-client'
import { TCompany } from '@/types/company.types'

import { Popover } from '../popover'
import { Button } from '../ui/button'
import { InfoItem } from '../ui/info-item'

type TProps = {
  addCompany?: boolean
  company?: TCompany | null
  onClick?: () => void
  refreshData?: () => void
  setSelectedCompany?: (company: TCompany) => void
}

const CompanyCard = ({
  addCompany = false,
  company,
  refreshData,
  onClick,
  setSelectedCompany,
}: TProps) => {
  const [userControlsAnchorEl, setUserControlsAnchorEl] = useState<HTMLButtonElement | null>(null)

  const navigate = useNavigate()
  const deleteCompanyMutation = useDeleteCompany()

  const handleDeleteCompany = async () => {
    if (!company) return

    deleteCompanyMutation.mutate(
      { id: company.id },
      {
        onSuccess: () => {
          setUserControlsAnchorEl(null)
          refreshData && refreshData()
        },
      },
    )
  }

  const handleEditCompany = async () => {
    if (!company) return
    setUserControlsAnchorEl(null)

    if (!onClick) return
    onClick()
    setSelectedCompany?.(company)
  }

  const handleRowClick = () => {
    navigate(`/${EAppRoutes.COMPANIES}/${company?.id}`)
  }

  return (
    <Stack width="100%" position="relative">
      {!addCompany && (
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
      )}

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
        onClick={addCompany ? onClick : handleRowClick}
      >
        {addCompany && (
          <Stack width={'100%'} height="100%" justifyContent="center" alignItems="center" gap={2}>
            <AddCircleOutlineIcon fontSize="large" sx={{ width: '64px', height: '64px' }} />
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
          <Button sx={{ gap: 2 }} onClick={handleEditCompany}>
            Edit
          </Button>

          <Button
            sx={{ gap: 2, backgroundColor: 'var(--color-red)' }}
            onClick={handleDeleteCompany}
          >
            Delete
          </Button>
        </Stack>
      </Popover>
    </Stack>
  )
}

export { CompanyCard }
