// R > src/components/SalvaQuest/QuestActionsPanel.tsx

import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { Button, Paper, Stack, Typography } from '@mui/material';

interface QuestActionsPanelProps {
  onConfirm: () => void;
  onClear: () => void;
  isProcessing: boolean;
  accountsProcessed: number;
}

const HINT_TEXT =
  'Copiá el listado de cuentas con sus misiones (Ctrl+C / Cmd+C) y tocá Pegar. Lo tomamos directo del portapapeles, no hace falta pegarlo a mano.';

export function QuestActionsPanel({
  onConfirm,
  onClear,
  isProcessing,
  accountsProcessed,
}: QuestActionsPanelProps) {
  const hasResults = accountsProcessed > 0;

  return (
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 2.5 } }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems="center"
        spacing={{ xs: 1.5, sm: 2 }}
      >
        <Button
          variant="outlined"
          color="inherit"
          onClick={onClear}
          disabled={isProcessing}
          sx={{ flexShrink: 0 }}
        >
          Limpiar
        </Button>

        {/* el centro alterna: instrucciones cuando no hay nada cargado,
            resumen de cuentas una vez que procesamos la tanda */}
        <Stack sx={{ flexGrow: 1, minWidth: 0 }} alignItems="center">
          {hasResults ? (
            <Typography variant="body1" color="text.secondary" textAlign="center">
              <Typography component="span" variant="h6" fontWeight={700} color="text.primary">
                Salva Quest
              </Typography>{' '}
              <Typography component="span" variant="h6" fontWeight={700} color="text.primary">
                {accountsProcessed}
              </Typography>{' '}
              cuentas analizadas
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {HINT_TEXT}
            </Typography>
          )}
        </Stack>

        <Button
          variant="contained"
          startIcon={<ContentPasteIcon />}
          onClick={onConfirm}
          disabled={isProcessing}
          sx={{ flexShrink: 0 }}
        >
          {isProcessing ? 'Leyendo…' : 'Pegar'}
        </Button>
      </Stack>
    </Paper>
  );
}
