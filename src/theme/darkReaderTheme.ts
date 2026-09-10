// R > src/theme/darkReaderTheme.ts

import { createTheme } from '@mui/material';

// paleta pensada para sentirse como el tema oscuro que arma Dark Reader:
// fondo casi negro con un toque tibio (no negro puro), texto gris claro en
// vez de blanco puro para que no canse la vista, acentos en azul suave.
export const darkReaderTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#181a1b',
      paper: '#232527',
    },
    text: {
      primary: '#e8e6e3',
      secondary: '#b0aeab',
    },
    primary: {
      main: '#8ab4f8',
    },
    success: {
      main: '#81c995',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#2f3234',
        },
        arrow: {
          color: '#2f3234',
        },
      },
    },
  },
});
