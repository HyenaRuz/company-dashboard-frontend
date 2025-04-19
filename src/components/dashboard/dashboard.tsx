import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

import { Logout } from '@mui/icons-material'
import HomeIcon from '@mui/icons-material/Home'
import {
  AppBar,
  Avatar,
  Container,
  Grid,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material'
import cn from 'classnames'

import { EAppRoutes } from '@/enums/app-routes.enum'
import { useLogout } from '@/helpers/logout'
import { useAppSelector } from '@/store'

import { Popover } from '../popover'
import { Button } from '../ui/button'
import styles from './styles.module.scss'

const HEADER_LINKS = [
  { label: 'Home', path: EAppRoutes.HOME, icon: HomeIcon },
  { label: 'Companies', path: EAppRoutes.COMPANIES, icon: HomeIcon },
]

const Dashboard = () => {
  const user = useAppSelector((state) => state.app.user)
  const location = useLocation()
  const [userControlsAnchorEl, setUserControlsAnchorEl] = useState<HTMLButtonElement | null>(null)

  const logout = useLogout()

  useEffect(() => {
    setUserControlsAnchorEl(null)
  }, [user])

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
          <Button
            onClick={(e) => {
              setUserControlsAnchorEl(e.currentTarget)
            }}
          >
            <Avatar src={user?.avatarUrl} sx={{ width: 64, height: 64 }} />
          </Button>
        </Toolbar>
      </AppBar>

      <Popover anchorEl={userControlsAnchorEl} onClose={() => setUserControlsAnchorEl(null)}>
        <Stack>
          <Typography>{user?.username}</Typography>
          <Typography>{user?.email}</Typography>
          <Button onClick={logout}>
            <Logout />
            Logout
          </Button>
        </Stack>
      </Popover>

      <Container sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 2 }}>
        <Outlet />
      </Container>
    </Grid>
  )
}

export { Dashboard }
