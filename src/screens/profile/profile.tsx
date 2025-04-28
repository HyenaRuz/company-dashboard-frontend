import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Avatar, IconButton, LinearProgress, Stack, Typography } from '@mui/material'
import moment from 'moment'

import { ChangePassword } from '@/components/forms/change-password'
import { ProfileEditForm } from '@/components/forms/profile-edit-form'
import { HistoryGrid } from '@/components/history-grid'
import { NoDataLabel } from '@/components/no-data-label'
import { Button } from '@/components/ui/button'
import { InfoItem } from '@/components/ui/info-item'
import { Modal } from '@/components/ui/modal'
import { ERole } from '@/enums/role.enum'
import { useMyAccount, useUser } from '@/hooks/query-client'
import { TAccount } from '@/types/account.types'

export type TDataConfig = {
  key: keyof TAccount
  label: string
  format?: any
}

const USER_DATA: TDataConfig[] = [
  { key: 'email', label: 'Email' },
  { key: 'id', label: 'ID' },
  { key: 'role', label: 'Role' },
  {
    key: 'createdAt',
    label: 'Created At',
    format: (value: string) => moment(value).format('DD.MM.YYYY HH:mm'),
  },
  { key: 'companiesCount', label: 'Companies Count' },
  { key: 'deletedAt', label: 'Account Active', format: (value: string) => (!value ? 'Yes' : 'No') },
]

const Profile = () => {
  const [editFormModalOpen, setEditFormModalOpen] = useState(false)
  const [passwordFormModalOpen, setPasswordFormModalOpen] = useState(false)
  const [user, setUser] = useState<TAccount>()
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams<{ id: string }>()

  const {
    data: userData,
    isLoading: isUserLoading,
    refetch: refetchUserData,
  } = useUser({ id: id ? +id : 0 })

  const {
    data: myAccountData,
    isLoading: isMyAccountLoading,
    refetch: refetchMyAccountData,
  } = useMyAccount()

  useEffect(() => {
    if (id) {
      setUser(userData)
      setIsLoading(isUserLoading)
    } else {
      setUser(myAccountData)
      setIsLoading(isMyAccountLoading)
    }
  }, [id, userData, myAccountData, isUserLoading, isMyAccountLoading])

  const handleRefetch = () => {
    if (id) {
      refetchUserData()
    } else {
      refetchMyAccountData()
    }
  }

  if (!user) {
    return <NoDataLabel />
  }

  const renderContent = () => {
    if (isLoading) {
      return <LinearProgress />
    }

    return (
      <>
        <IconButton
          onClick={() => {
            setEditFormModalOpen(true)
          }}
        >
          <Avatar src={user?.avatarUrl} sx={{ width: 240, height: 240 }} />
        </IconButton>

        <Stack width="100%" gap={4} justifyContent="flex-end">
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography variant="h4">{user?.username}</Typography>

            <Stack flexDirection="row" gap={2}>
              <Button
                variant="contained"
                onClick={() => {
                  setEditFormModalOpen(true)
                }}
              >
                Edit Account
              </Button>

              <Button
                onClick={() => {
                  setPasswordFormModalOpen(true)
                }}
              >
                Change password
              </Button>
            </Stack>
          </Stack>

          <Stack width="100%" gap={0.5}>
            {user &&
              USER_DATA.map((item) => (
                <div key={item.key}>
                  <InfoItem
                    label={item.label}
                    data={
                      item.format
                        ? item.format(user[item.key as keyof typeof user])
                        : user[item.key as keyof typeof user]
                    }
                  />
                </div>
              ))}
          </Stack>
        </Stack>
      </>
    )
  }

  return (
    <>
      <Stack gap={4}>
        <Stack
          flexDirection={{ xs: 'column', sm: 'row', md: 'row' }}
          justifyContent="space-between"
          gap={4}
        >
          {renderContent()}
        </Stack>

        {user?.role !== ERole.USER && user?.targetHistories && (
          <HistoryGrid data={user?.targetHistories} />
        )}
      </Stack>

      {user && (
        <>
          <Modal
            open={editFormModalOpen}
            onClose={() => {
              setEditFormModalOpen(false)
            }}
            title="Edit profile"
          >
            <ProfileEditForm
              userData={user}
              setFormModalOpen={() => {
                setEditFormModalOpen(false)
              }}
              adminForm={!!id}
              refreshData={handleRefetch}
            />
          </Modal>

          <Modal
            open={passwordFormModalOpen}
            onClose={() => {
              setPasswordFormModalOpen(false)
            }}
            title="Edit profile"
          >
            <ChangePassword
              onClose={() => {
                setPasswordFormModalOpen(false)
              }}
            />
          </Modal>
        </>
      )}
    </>
  )
}

export { Profile }
