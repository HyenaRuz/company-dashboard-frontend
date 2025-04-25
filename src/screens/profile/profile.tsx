import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Avatar, IconButton, LinearProgress, Stack, Typography } from '@mui/material'
import moment from 'moment'

import { getAccount } from '@/api/account'
import { ChangePassword } from '@/components/forms/change-password'
import { ProfileEditForm } from '@/components/forms/profile-edit-form'
import { NoDataLabel } from '@/components/no-data-label'
import { Button } from '@/components/ui/button'
import { InfoItem } from '@/components/ui/info-item'
import { Modal } from '@/components/ui/modal'
import { useUser } from '@/hooks/query-client'
import { TAccount } from '@/types/account.types'

export type TDataConfig = {
  key: keyof TAccount
  lable: string
  format?: any
}

const USER_DATA: TDataConfig[] = [
  { key: 'email', lable: 'Email' },
  { key: 'id', lable: 'ID' },
  { key: 'role', lable: 'Role' },
  {
    key: 'createdAt',
    lable: 'Created At',
    format: (value: string) => moment(value).format('DD.MM.YYYY HH:mm'),
  },
  { key: 'companiesCount', lable: 'Companies Count' },
  { key: 'deletedAt', lable: 'Account Active', format: (value: string) => (!value ? 'Yes' : 'No') },
]

const Profile = () => {
  const [formModalOpen, setFormModalOpen] = useState(false)
  const [user, setUser] = useState<TAccount | null>(null)
  const [activeForm, setActiveForm] = useState<'edit' | 'password' | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams<{ id: string }>()
  const { data: userData, isLoading: isUserLoading } = useUser()

  const fetchAccount = async (id: number) => {
    try {
      setIsLoading(true)
      const data = await getAccount(id)
      setUser(data)
    } catch (error) {
      console.error('Error fetching account', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchAccount(+id)
    } else if (userData) {
      setUser(userData)
      setIsLoading(isUserLoading)
    }
  }, [id, userData, isUserLoading])

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
            setActiveForm('edit')
            setFormModalOpen(true)
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
                  setActiveForm('edit')
                  setFormModalOpen(true)
                }}
              >
                Edit Account
              </Button>

              <Button
                onClick={() => {
                  setActiveForm('password')
                  setFormModalOpen(true)
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
                    label={item.lable}
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
    <Stack
      flexDirection={{ xs: 'column', sm: 'row', md: 'row' }}
      justifyContent="space-between"
      gap={4}
    >
      {renderContent()}

      {user && (
        <Modal
          open={formModalOpen}
          onClose={() => {
            setFormModalOpen(false)
            setActiveForm(null)
          }}
          title="Edit profile"
        >
          {activeForm === 'edit' ? (
            <ProfileEditForm
              userData={user}
              setFormModalOpen={() => {
                setFormModalOpen(false)
                setActiveForm(null)
              }}
              adminForm={!!id}
              refreshData={() => fetchAccount(user.id)}
            />
          ) : (
            <ChangePassword
              onClose={() => {
                setFormModalOpen(false)
                setActiveForm(null)
              }}
            />
          )}
        </Modal>
      )}
    </Stack>
  )
}

export { Profile }
