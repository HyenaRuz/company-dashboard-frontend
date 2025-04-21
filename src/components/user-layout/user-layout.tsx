import { Link, Outlet, useLocation } from 'react-router-dom'

import HomeIcon from '@mui/icons-material/Home'
import { AppBar, Container, Grid, MenuItem, Toolbar, Typography } from '@mui/material'
import cn from 'classnames'

import { EAppRoutes } from '@/enums/app-routes.enum'

import { ProfileButton } from '../profile-button'
import styles from './styles.module.scss'

const HEADER_LINKS = [
  { label: 'Home', path: EAppRoutes.HOME, icon: HomeIcon },
  { label: 'Companies', path: EAppRoutes.COMPANIES, icon: HomeIcon },
]

const UserLayout = () => {
  const location = useLocation()

  const renderContent = () => {
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
                <Link key={item.path} to={`${item.path}`}>
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

          <ProfileButton />
        </Toolbar>
      </AppBar>

      {renderContent()}
    </Grid>
  )
}

export { UserLayout }
