import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Avatar, Box, Grid, LinearProgress, Stack, Typography } from '@mui/material'
import moment from 'moment'

import placeholder from '@/assets/placeholder.png'
import { CompanyForm } from '@/components/forms/company-form'
import { HistoryGrid } from '@/components/history-grid'
import { Button } from '@/components/ui/button'
import { InfoItem } from '@/components/ui/info-item'
import { Modal } from '@/components/ui/modal'
import { EAppRoutes } from '@/enums/app-routes.enum'
import { ERole } from '@/enums/role.enum'
import { useCompany, useUserFromCache } from '@/hooks/query-client'
import { TAccount } from '@/types/account.types'
import { TCompany } from '@/types/company.types'

export type TDataConfig<T> = {
  accessor: (data: T) => any
  label: string
  format?: (value: any) => string
}

const COMPANY_DATA: TDataConfig<TCompany>[] = [
  { accessor: (company) => company.id, label: 'ID' },
  { accessor: (company) => company.service, label: 'Service' },
  { accessor: (company) => company.capital, label: 'Capital' },
  {
    accessor: (company) => company.createdAt,
    label: 'Created At',
    format: (value: string) => moment(value).format('DD.MM.YYYY'),
  },
  {
    accessor: (company) => company.updatedAt,
    label: 'Updated At',
    format: (value: string) => moment(value).format('DD.MM.YYYY'),
  },
  {
    accessor: (company) => company.deletedAt,
    label: 'Company Active',
    format: (value: string) => (!value ? 'Yes' : 'No'),
  },
]

const USER_DATA: TDataConfig<TAccount>[] = [
  { accessor: (account) => account.username, label: 'Username' },
  { accessor: (account) => account.id, label: 'ID' },
  { accessor: (account) => account.email, label: 'Email' },
  { accessor: (account) => account.role, label: 'Role' },
  {
    accessor: (account) => account.createdAt,
    label: 'Created At',
    format: (value: string) => moment(value).format('DD.MM.YYYY HH:mm'),
  },
  { accessor: (account) => account._count?.companies, label: 'Companies Count' },
  {
    accessor: (account) => account.deletedAt,
    label: 'Account Active',
    format: (value: string) => (!value ? 'Yes' : 'No'),
  },
]

const Company = () => {
  const [formModalOpen, setFormModalOpen] = useState(false)

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const user = useUserFromCache()

  const {
    data: company,
    isLoading,
    error,
    refetch,
  } = useCompany({
    id: +id!,
  })

  if (error) {
    toast(`Error loading company: ${(error as any).message}`, { type: 'error' })
    navigate(`/${EAppRoutes.COMPANIES}`)
  }

  const renderContent = () => {
    if (isLoading) {
      return <LinearProgress />
    }

    return (
      <Stack gap={2}>
        <Stack position="relative" marginBottom={8}>
          <Box
            component="img"
            src={company?.logoUrl || placeholder}
            alt="Company logo"
            sx={{
              width: '100%',
              height: '100%',
              maxHeight: 370,
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
          <Avatar
            src={company?.account.avatarUrl}
            sx={{ width: 150, height: 150, position: 'absolute', left: 40, bottom: -60 }}
          />
        </Stack>

        <Stack flexDirection="row" justifyContent="space-between">
          <Typography variant="h4">{company?.name}</Typography>
          <Button variant="contained" onClick={() => setFormModalOpen(true)}>
            Edit company
          </Button>
        </Stack>

        <Grid gridTemplateColumns={'repeat(2, 1fr)'} gap={2} display="grid" justifyItems="center">
          <Stack width="100%" gap={0.5}>
            <Typography variant="h5">Company</Typography>
            {company &&
              COMPANY_DATA.map((item, index) => (
                <div key={index}>
                  <InfoItem
                    label={item.label}
                    data={
                      item.format ? item.format(item.accessor(company)) : item.accessor(company)
                    }
                  />
                </div>
              ))}
          </Stack>

          <Stack width="100%" gap={0.5}>
            <Typography variant="h5">Owner</Typography>
            {company?.account &&
              USER_DATA.map((item, index) => (
                <div key={index}>
                  <InfoItem
                    label={item.label}
                    data={
                      item.format
                        ? item.format(item.accessor(company.account))
                        : item.accessor(company.account)
                    }
                  />
                </div>
              ))}
          </Stack>
        </Grid>
      </Stack>
    )
  }

  return (
    <Stack gap={4}>
      {renderContent()}

      {user?.role !== ERole.USER && company?.historyLogs && (
        <HistoryGrid data={company?.historyLogs} />
      )}

      <Modal open={formModalOpen} onClose={() => setFormModalOpen(false)}>
        <CompanyForm
          onClose={() => setFormModalOpen(false)}
          reloadData={refetch}
          company={company}
          type="update"
        />
      </Modal>
    </Stack>
  )
}

export { Company }
