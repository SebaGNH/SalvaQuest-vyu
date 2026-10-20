// R > src/components/SalvaQuest/QuestActionsPanel.tsx

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Button, InputAdornment, Paper, Stack, TextField } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import type { BoardViewMode } from '../../types/mission.types';

interface QuestActionsPanelProps {
  hasResults: boolean;
  accountsProcessed: number;
  isProcessing: boolean;
  viewMode: BoardViewMode;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onConfirm: () => void;
  onClear: () => void;
  onToggleViewMode: () => void;
}

// los cuatro botones comparten ancho para que al alternar no se mueva nada.
// 160px alcanza de sobra para "Limpiar 999" (el máximo que vamos a ver); en
// mobile cada uno toma casi la mitad de la fila (el margen de 10px absorbe
// el redondeo para que nunca salte de línea)
const BUTTON_SX: SxProps<Theme> = {
  width: { xs: 'calc(50% - 10px)', sm: 160 },
  px: 1,
  whiteSpace: 'nowrap',
  flexShrink: 0,
};

// mismo alto que un botón mediano de MUI (36.5px) para que el panel no
// "salte" de altura al entrar a la vista de listado
const SEARCH_INPUT_SX: SxProps<Theme> = {
  // en mobile baja a su propia fila (flex-basis 100% + order); desde tablet
  // ocupa el espacio que queda entre los dos botones
  flex: { xs: '1 1 100%', sm: '1 1 0%' },
  order: { xs: 3, sm: 0 },
  minWidth: 0,
  '& .MuiOutlinedInput-root': { height: 36.5 },
  '& .MuiOutlinedInput-input': { py: 0 },
};

export function QuestActionsPanel({
  hasResults,
  accountsProcessed,
  isProcessing,
  viewMode,
  searchQuery,
  onSearchChange,
  onConfirm,
  onClear,
  onToggleViewMode,
}: QuestActionsPanelProps) {
  const isListView = viewMode === 'allMissions';

  return (
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 2.5 } }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
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

        {/* buscador: solo existe en la vista de listado. Como se monta recién
            cuando se pulsa Listar, autoFocus lo deja listo para escribir */}
        {isListView && (
          <TextField
            autoFocus
            size="small"
            autoComplete="off"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar misión…"
            sx={SEARCH_INPUT_SX}
            slotProps={{
              htmlInput: { 'aria-label': 'Buscar misión' },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}

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
