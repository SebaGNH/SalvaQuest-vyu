// R > src/components/SalvaQuest/QuestActionsPanel.tsx

import ContentPasteIcon from '@mui/icons-material/ContentPaste';
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
          Copiá el listado de cuentas con sus misiones (Ctrl+C / Cmd+C) y tocá Pegar. Lo tomamos
          directo del portapapeles, no hace falta pegarlo a mano.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" spacing={1}>
          <Button variant="outlined" color="inherit" onClick={onClear} disabled={isProcessing}>
            Limpiar
          </Button>
          <Button
            variant="contained"
            startIcon={<ContentPasteIcon />}
            onClick={onConfirm}
            disabled={isProcessing}
          >
            {isProcessing ? 'Leyendo portapapeles…' : 'Pegar'}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
