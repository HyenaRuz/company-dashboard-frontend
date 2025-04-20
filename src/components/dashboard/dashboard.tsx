import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { Logout } from '@mui/icons-material'
import HomeIcon from '@mui/icons-material/Home'
import {
  AppBar,
  Avatar,
  Container,
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import cn from 'classnames'

import { EAppRoutes } from '@/enums/app-routes.enum'
import { useLogout } from '@/helpers/logout'
import { useUserFromCache } from '@/hooks/query-client'

import { Popover } from '../popover'
import { Button } from '../ui/button'
import styles from './styles.module.scss'

const HEADER_LINKS = [
  { label: 'Home', path: EAppRoutes.HOME, icon: HomeIcon },
  { label: 'Companies', path: EAppRoutes.COMPANIES, icon: HomeIcon },
]

const Dashboard = () => {
  const user = useUserFromCache()

  const location = useLocation()
  const [userControlsAnchorEl, setUserControlsAnchorEl] = useState<HTMLButtonElement | null>(null)

  const logout = useLogout()

  useEffect(() => {
    setUserControlsAnchorEl(null)
  }, [user])

  const renderContent = () => {
    // if (isLoading) {
    //   return <LinearProgress />
    // }

    return (
      <Container sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 2 }}>
        <Outlet />
      </Container>
    )
  }

  return (
    <Grid minHeight="100vh" container flexDirection="column">
      <AppBar position="static" sx={{ padding: 2 }}>
        <Toolbar>
          <Grid container alignItems="center" justifyContent="space-between" width="100%">
            <Grid container alignItems="center">
              {HEADER_LINKS.map((item) => (
                <Link key={item.path} to={`${EAppRoutes.DASHBOARD}/${item.path}`}>
                  <MenuItem
                    className={cn({ [styles.active]: location.pathname.includes(item.path) })}
                  >
                    <Grid display="flex" alignItems="center" gap={1}>
                      {item.icon && <item.icon />}
                      <Typography variant="body2" sx={{ textAlign: 'center' }}>
                        {item.label}
                      </Typography>
                    </Grid>
                  </MenuItem>
                </Link>
              ))}
            </Grid>
          </Grid>
          <IconButton
            onClick={(e) => {
              setUserControlsAnchorEl(e.currentTarget)
            }}
          >
            <Avatar src={user?.avatarUrl} sx={{ width: 64, height: 64 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Popover anchorEl={userControlsAnchorEl} onClose={() => setUserControlsAnchorEl(null)}>
        <Stack gap={2}>
          <Stack>
            <Typography>{user?.username}</Typography>
            <Typography>{user?.email}</Typography>
          </Stack>

          <Divider orientation="horizontal" />

          <Button onClick={logout} variant="contained" sx={{ gap: 2 }}>
            Logout
            <Logout />
          </Button>
        </Stack>
      </Popover>

      {renderContent()}
    </Grid>
  )
}

export { Dashboard }
