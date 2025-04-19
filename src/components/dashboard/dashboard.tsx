import { Link, Outlet } from 'react-router-dom'

import HomeIcon from '@mui/icons-material/Home'
import { AppBar, Avatar, Container, Grid, MenuItem, Toolbar, Typography } from '@mui/material'
import cn from 'classnames'

import { EAppRoutes } from '@/enums/app-routes.enum'
import { useAppSelector } from '@/store'

import styles from './styles.module.scss'

const HEADER_LINKS = [
  { label: 'Home', path: EAppRoutes.HOME, icon: HomeIcon },
  { label: 'COMPANYS', path: EAppRoutes.COMPANYS, icon: HomeIcon },
]

const Dashboard = () => {
  const user = useAppSelector((state) => state.app.user)

  return (
    <Grid minHeight="100vh" container flexDirection="column">
      <AppBar position="static">
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
        </Toolbar>
      </AppBar>

      <Container sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 2 }}>
        <Outlet />
        <Avatar src={user?.avatarUrl} sx={{ width: 96, height: 96 }} />
      </Container>
    </Grid>
  )
}

export { Dashboard }
