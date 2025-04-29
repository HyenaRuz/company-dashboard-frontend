import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { Logout } from '@mui/icons-material'
import PersonIcon from '@mui/icons-material/Person'
import { Avatar, Divider, Grid, IconButton, MenuItem, Stack, Typography } from '@mui/material'
import cn from 'classnames'

import { EAppRoutes } from '@/enums/app-routes.enum'
import { logout } from '@/helpers/logout'
import { useUserFromCache } from '@/hooks/query-client'

import { Popover } from '../popover'
import { Button } from '../ui/button'
import styles from './styles.module.scss'

const PROFILE_LINKS = [{ label: 'Profile', path: EAppRoutes.PROFILE, icon: PersonIcon }]

const ProfileButton = () => {
  const [userControlsAnchorEl, setUserControlsAnchorEl] = useState<HTMLButtonElement | null>(null)

  const user = useUserFromCache()
  const location = useLocation()
  const navigate = useNavigate()

  const logoutHandler = () => {
    logout()
    navigate(EAppRoutes.LOGIN)
  }

  useEffect(() => {
    setUserControlsAnchorEl(null)
  }, [user])

  return (
    <>
      <IconButton
        onClick={(e) => {
          setUserControlsAnchorEl(e.currentTarget)
        }}
      >
        <Avatar src={user?.avatarUrl} sx={{ width: 64, height: 64 }} />
      </IconButton>

      <Popover anchorEl={userControlsAnchorEl} onClose={() => setUserControlsAnchorEl(null)}>
        <Stack gap={2}>
          <Stack>
            <Typography>{user?.username}</Typography>
            <Typography>{user?.email}</Typography>
          </Stack>

          <Divider orientation="horizontal" />

          {PROFILE_LINKS.map((item) => (
            <Link to={item.path} key={item.path} onClick={() => setUserControlsAnchorEl(null)}>
              <MenuItem className={cn({ [styles.active]: location.pathname.includes(item.path) })}>
                <Grid display="flex" alignItems="center" gap={1}>
                  {item.icon && <item.icon />}
                  <Typography
                    fontWeight="bold"
                    whiteSpace="normal"
                    variant="body1"
                    sx={{ textAlign: 'center' }}
                  >
                    {item.label}
                  </Typography>
                </Grid>
              </MenuItem>
            </Link>
          ))}

          <Divider orientation="horizontal" />

          <Button onClick={logoutHandler} variant="contained" sx={{ gap: 2 }}>
            Logout
            <Logout />
          </Button>
        </Stack>
      </Popover>
    </>
  )
}

export { ProfileButton }
