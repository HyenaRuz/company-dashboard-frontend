import { Outlet } from 'react-router-dom'

import { Container, Grid } from '@mui/material'

import { Header } from '../header'

const UserLayout = () => {
  const renderContent = () => {
    return (
      <Container sx={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 2 }}>
        <Outlet />
      </Container>
    )
  }

  return (
    <Grid minHeight="100vh" container flexDirection="column">
      <Header />

      {renderContent()}
    </Grid>
  )
}

export { UserLayout }
