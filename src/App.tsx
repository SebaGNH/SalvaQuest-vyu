// R > src/App.tsx

import { CssBaseline, ThemeProvider } from '@mui/material';
import { SalvaQuestPage } from './pages/SalvaQuestPage';
import { darkReaderTheme } from './theme/darkReaderTheme';

export function App() {
  return (
    <ThemeProvider theme={darkReaderTheme}>
      <CssBaseline />
      <SalvaQuestPage />
    </ThemeProvider>
  );
}
