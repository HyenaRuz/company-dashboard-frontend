'use client'

import { createTheme } from '@mui/material/styles'

// Augment the palette to include an ochre color
declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary']
  }

  interface PaletteOptions {
    accent?: PaletteOptions['primary']
  }
}

// Update the Button's color options to include an ochre option
declare module '@mui/material/Typography' {
  interface TypographyPropsColorOverrides {
    accent: true
  }
}

const breakpoints = {
  xl: 1400,
  lg: 1250,
  md: 900,
  sm: 600,
  xs: 0,
}

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    mode: 'dark',
    accent: {
      main: '#eacb47',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
    primary: {
      main: '#eacb47',
    },
    text: {
      primary: '#ddd',
      secondary: '#aaa',
    },
  },
  breakpoints: {
    values: breakpoints,
  },
})

export { theme, breakpoints }
