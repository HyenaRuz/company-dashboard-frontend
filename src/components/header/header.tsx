import { Link, useLocation } from 'react-router-dom'

import AddModeratorIcon from '@mui/icons-material/AddModerator'
import BusinessIcon from '@mui/icons-material/Business'
import HomeIcon from '@mui/icons-material/Home'
import PeopleIcon from '@mui/icons-material/People'
import { AppBar, Grid, MenuItem, Toolbar, Typography } from '@mui/material'
import cn from 'classnames'

import { EAppRoutes } from '@/enums/app-routes.enum'
import { ERole } from '@/enums/role.enum'
import { useUserFromCache } from '@/hooks/query-client'

import { ProfileButton } from '../profile-button'
import styles from './styles.module.scss'

const HEADER_LINKS = [
  { label: 'Home', path: EAppRoutes.HOME, icon: HomeIcon },
  { label: 'Companies', path: EAppRoutes.COMPANIES, icon: BusinessIcon },
  {
    label: 'Users',
    path: EAppRoutes.USERS,
    icon: PeopleIcon,
    role: [ERole.ADMIN, ERole.SUPERADMIN],
  },
  {
    label: 'Admins',
    path: EAppRoutes.ADMINS,
    icon: AddModeratorIcon,
    role: [ERole.SUPERADMIN],
  },
]

const Header = () => {
  const location = useLocation()
  const user = useUserFromCache()

  const links = HEADER_LINKS.filter((item) => {
    if (!item.role) return true
    return item.role.includes(user?.role || ERole.USER)
  })

  return (
    <AppBar position="static" sx={{ padding: 2 }}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between" width="100%">
          <Grid container alignItems="center">
            {links.map((item) => (
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
  )
}

export { Header }
