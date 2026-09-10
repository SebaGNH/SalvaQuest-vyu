// R > src/components/SalvaQuest/QuestInputPanel.tsx

import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material';

interface QuestInputPanelProps {
  value: string;
  onChange: (value: string) => void;
  onConfirm: () => void;
  onClear: () => void;
}

const PLACEHOLDER = [
  'l-BANDIDO-l',
  'Rerolls: 1',
  'Husk Extermination (Outlander)',
  'Quest:daily_huskextermination_outlander',
  '250',
  '100',
  '0/300',
  '...',
].join('\n');

export function QuestInputPanel({ value, onChange, onConfirm, onClear }: QuestInputPanelProps) {
  return (
    <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 } }}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          spacing={1}
        >
          <Button variant="outlined" color="inherit" onClick={onClear}>
            Limpiar
          </Button>
          <Button variant="contained" onClick={onConfirm}>
            Confirmar
          </Button>
        </Stack>

        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Pegá acá el listado de cuentas con sus misiones diarias
          </Typography>
          <TextField
            value={value}
            onChange={(e) => onChange(e.target.value)}
            multiline
            minRows={10}
            maxRows={20}
            fullWidth
            placeholder={PLACEHOLDER}
          />
        </Box>
      </Stack>
    </Paper>
  );
}
