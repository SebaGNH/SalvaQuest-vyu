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
        <Typography variant="h4" component="h1" fontWeight={700}>
          Salva Quest
        </Typography>

        <QuestInputPanel
          value={rawText}
          onChange={setRawText}
          onConfirm={handleConfirm}
          onClear={handleClear}
        />

        <QuestResultsBoard status={status} board={board} accountsProcessed={accountsProcessed} />
      </Stack>
    </Container>
  );
}
