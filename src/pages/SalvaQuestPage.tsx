// R > src/pages/SalvaQuestPage.tsx

import { Container, Stack } from '@mui/material';
import { QuestActionsPanel } from '../components/SalvaQuest/QuestActionsPanel';
import { QuestResultsBoard } from '../components/SalvaQuest/QuestResultsBoard';
import { useSalvaQuestBoard } from '../hooks/useSalvaQuestBoard';

export function SalvaQuestPage() {
  const {
    status,
    board,
    accountsProcessed,
    errorMessage,
    isProcessing,
    hiddenMissionNames,
    hiddenAccountNames,
    viewMode,
    handleConfirm,
    handleClear,
    handleToggleViewMode,
    handleHideMission,
    handleHideAccount,
  } = useSalvaQuestBoard();

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, sm: 3 } }}>
      <Stack spacing={2.5}>
        <QuestActionsPanel
          hasResults={status === 'success'}
          accountsProcessed={accountsProcessed}
          isProcessing={isProcessing}
          viewMode={viewMode}
          onConfirm={handleConfirm}
          onClear={handleClear}
          onToggleViewMode={handleToggleViewMode}
        />

        <QuestResultsBoard
          status={status}
          viewMode={viewMode}
          board={board}
          errorMessage={errorMessage}
          hiddenMissionNames={hiddenMissionNames}
          hiddenAccountNames={hiddenAccountNames}
          onHideMission={handleHideMission}
          onHideAccount={handleHideAccount}
        />
      </Stack>
    </Container>
  );
}
