// R > src/pages/SalvaQuestPage.tsx

import { Container, Stack, Typography } from '@mui/material';
import { QuestActionsPanel } from '../components/SalvaQuest/QuestActionsPanel';
import { QuestResultsBoard } from '../components/SalvaQuest/QuestResultsBoard';
import { useSalvaQuestBoard } from '../hooks/useSalvaQuestBoard';

export function SalvaQuestPage() {
  const { status, board, accountsProcessed, errorMessage, isProcessing, handleConfirm, handleClear } =
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

        <QuestActionsPanel onConfirm={handleConfirm} onClear={handleClear} isProcessing={isProcessing} />

        <QuestResultsBoard status={status} board={board} errorMessage={errorMessage} />
      </Stack>
    </Container>
  );
}
