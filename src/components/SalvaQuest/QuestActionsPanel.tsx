// R > src/components/SalvaQuest/QuestActionsPanel.tsx

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Button, Paper, Stack } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import type { BoardViewMode } from '../../types/mission.types';

interface QuestActionsPanelProps {
  hasResults: boolean;
  accountsProcessed: number;
  isProcessing: boolean;
  viewMode: BoardViewMode;
  onConfirm: () => void;
  onClear: () => void;
  onToggleViewMode: () => void;
}

// los cuatro botones comparten ancho para que al alternar no se mueva nada.
// 160px alcanza de sobra para "Limpiar 999" (el máximo que vamos a ver); en
// mobile cada uno toma la mitad de la fila para que entren los dos
const BUTTON_SX: SxProps<Theme> = {
  width: { xs: 'calc(50% - 8px)', sm: 160 },
  px: 1,
  whiteSpace: 'nowrap',
  flexShrink: 0,
};

export function QuestActionsPanel({
  hasResults,
  accountsProcessed,
  isProcessing,
  viewMode,
  onConfirm,
  onClear,
  onToggleViewMode,
}: QuestActionsPanelProps) {
  const isListView = viewMode === 'allMissions';

  return (
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 2.5 } }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        {/* izquierda: Listar <-> Volver (sin cuentas cargadas no hay nada que listar) */}
        <Button
          variant="outlined"
          color="inherit"
          startIcon={isListView ? <ArrowBackIcon /> : <ListAltIcon />}
          onClick={onToggleViewMode}
          disabled={!hasResults || isProcessing}
          sx={BUTTON_SX}
        >
          {isListView ? 'Volver' : 'Listar'}
        </Button>

        {/* derecha: Pegar <-> Limpiar N, mismo lugar y mismo tamaño */}
        {hasResults ? (
          <Button
            variant="outlined"
            color="inherit"
            onClick={onClear}
            aria-label={`Limpiar, ${accountsProcessed} cuentas analizadas`}
            sx={BUTTON_SX}
          >
            Limpiar {accountsProcessed}
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<ContentPasteIcon />}
            onClick={onConfirm}
            disabled={isProcessing}
            sx={BUTTON_SX}
          >
            {isProcessing ? 'Leyendo…' : 'Pegar'}
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
