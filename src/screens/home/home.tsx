import { Container, Grid } from '@mui/material'

const Home = () => {
  const renderContent = () => {
    return (
      <Grid gap={2} display="grid">
        <Grid gridTemplateColumns={'repeat(3, 1fr)'} gap={2} display="grid"></Grid>
        Home
      </Grid>
    )
  }

  return <Container>{renderContent()}</Container>
}

export { Home }
