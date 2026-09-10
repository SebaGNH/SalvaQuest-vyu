// R > src/components/SalvaQuest/QuestActionsPanel.tsx

import { Button, Paper, Stack, Typography } from '@mui/material';

interface QuestActionsPanelProps {
  onConfirm: () => void;
  onClear: () => void;
  isProcessing: boolean;
}

export function QuestActionsPanel({ onConfirm, onClear, isProcessing }: QuestActionsPanelProps) {
  return (
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 } }}>
      <Stack spacing={1.5}>
        <Typography variant="subtitle2" color="text.secondary">
          Copiá el listado de cuentas con sus misiones (Ctrl+C / Cmd+C) y tocá Confirmar. Lo
          tomamos directo del portapapeles, no hace falta pegarlo.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
          <Button variant="outlined" color="inherit" onClick={onClear} disabled={isProcessing}>
            Limpiar
          </Button>
          <Button variant="contained" onClick={onConfirm} disabled={isProcessing}>
            {isProcessing ? 'Leyendo portapapeles…' : 'Confirmar'}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
