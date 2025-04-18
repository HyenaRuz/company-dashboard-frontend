import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider, createTheme } from '@mui/material'

import App from './App.tsx'
import './index.css'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </StrictMode>,
)
