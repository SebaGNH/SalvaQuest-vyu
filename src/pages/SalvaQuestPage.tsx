// R > src/pages/SalvaQuestPage.tsx

import { Container, Stack, Typography } from '@mui/material';
import { QuestInputPanel } from '../components/SalvaQuest/QuestInputPanel';
import { QuestResultsBoard } from '../components/SalvaQuest/QuestResultsBoard';
import { useSalvaQuestBoard } from '../hooks/useSalvaQuestBoard';

export function SalvaQuestPage() {
  const { rawText, setRawText, status, board, accountsProcessed, handleConfirm, handleClear } =
    useSalvaQuestBoard();

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, sm: 5 } }}>
      <Stack spacing={3}>
        <Stack direction="row" alignItems="baseline" spacing={1.5} flexWrap="wrap" rowGap={0.5}>
          <Typography variant="h4" component="h1" fontWeight={700}>
            Salva Quest
          </Typography>
          {accountsProcessed > 0 && (
            <Typography variant="body1" color="text.secondary">
              <Typography component="span" variant="h6" fontWeight={700} color="text.primary">
                {accountsProcessed}
              </Typography>{' '}
              cuentas analizadas
            </Typography>
          )}
        </Stack>

        <QuestInputPanel
          value={rawText}
          onChange={setRawText}
          onConfirm={handleConfirm}
          onClear={handleClear}
        />

        <QuestResultsBoard status={status} board={board} />
      </Stack>
    </Container>
  );
}
