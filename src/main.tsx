import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.tsx'
import './index.css'
import { theme } from './theme/index.ts'

export const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme} defaultMode="system">
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </QueryClientProvider>,
)
