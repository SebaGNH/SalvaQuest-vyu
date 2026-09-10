// R > src/App.tsx

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { SalvaQuestPage } from './pages/SalvaQuestPage';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SalvaQuestPage />
    </ThemeProvider>
  );
}
