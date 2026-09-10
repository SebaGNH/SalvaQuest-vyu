// R > src/components/SalvaQuest/QuestResultsBoard.tsx

import { Alert, Stack } from '@mui/material';
import type { BoardStatus, ClassifiedBoard } from '../../types/mission.types';
import { GroupedMissionsSection } from './GroupedMissionsSection';
import { IndividualAccountsSection } from './IndividualAccountsSection';

interface QuestResultsBoardProps {
  status: BoardStatus;
  board: ClassifiedBoard | null;
}

export function QuestResultsBoard({ status, board }: QuestResultsBoardProps) {
  if (status === 'empty') {
    return (
      <Alert severity="info">
        Pegá el listado de misiones y tocá Confirmar para ver la clasificación.
      </Alert>
    );
  }

  if (status === 'error' || !board) {
    return (
      <Alert severity="error">
        No pude reconocer ninguna cuenta en el texto pegado. Revisá que el formato sea el de
        siempre (nombre de cuenta, línea &quot;Rerolls: N&quot; y después cada misión).
      </Alert>
    );
  }

  return (
    <Stack spacing={3}>
      <GroupedMissionsSection
        title="🥇 GRUPALES – PRIORIDAD ALTA 🥇"
        entries={board.grupalesAlta}
        emptyLabel="No hay misiones grupales de prioridad alta en esta tanda."
      />

      <GroupedMissionsSection
        title="🌓 GRUPALES – PRIORIDAD MEDIA 🌓"
        entries={board.grupalesMedia}
        emptyLabel="No hay misiones grupales de prioridad media en esta tanda."
      />

      <IndividualAccountsSection
        title="🔥 INDIVIDUALES – PRIORIDAD ALTA (3 MISIONES) 🔥"
        accounts={board.individualesAlta}
        emptyLabel="Ninguna cuenta con 3 misiones activas."
      />

      <IndividualAccountsSection
        title="🔻 INDIVIDUALES – PRIORIDAD BAJA (2 MISIONES) 🔻"
        accounts={board.individualesBaja}
        emptyLabel="Ninguna cuenta con 2 misiones de Husk Extermination."
      />
    </Stack>
  );
}
