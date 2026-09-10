// R > src/components/SalvaQuest/QuestResultsBoard.tsx

import { Alert, Stack } from '@mui/material';
import type { BoardStatus, ClassifiedBoard } from '../../types/mission.types';
import { GroupedMissionsSection } from './GroupedMissionsSection';
import { IndividualAccountsSection } from './IndividualAccountsSection';

interface QuestResultsBoardProps {
  status: BoardStatus;
  board: ClassifiedBoard | null;
  errorMessage: string | null;
  hiddenMissionNames: Set<string>;
  onHideMission: (missionName: string) => void;
}

export function QuestResultsBoard({
  status,
  board,
  errorMessage,
  hiddenMissionNames,
  onHideMission,
}: QuestResultsBoardProps) {
  if (status === 'empty') {
    return (
      <Alert severity="info">
        Copiá el listado de misiones y tocá Confirmar para ver la clasificación.
      </Alert>
    );
  }

  if (status === 'error' || !board) {
    return (
      <Alert severity="error">
        {errorMessage ??
          'No pude reconocer ninguna cuenta en el texto copiado. Revisá que el formato sea el de siempre.'}
      </Alert>
    );
  }

  // las misiones que el usuario fue marcando como completadas se sacan de las
  // listas grupales; el resto del tablero (individuales) queda como estaba
  const grupalesAlta = board.grupalesAlta.filter((entry) => !hiddenMissionNames.has(entry.missionName));
  const grupalesMedia = board.grupalesMedia.filter((entry) => !hiddenMissionNames.has(entry.missionName));

  const groupedMissionNames = new Set([
    ...grupalesAlta.map((entry) => entry.missionName),
    ...grupalesMedia.map((entry) => entry.missionName),
  ]);

  const nothingToShow =
    grupalesAlta.length === 0 &&
    grupalesMedia.length === 0 &&
    board.individualesAlta.length === 0 &&
    board.individualesBaja.length === 0;

  if (nothingToShow) {
    return (
      <Alert severity="success">
        No quedan misiones grupales ni individuales pendientes en esta tanda.
      </Alert>
    );
  }

  return (
    <Stack spacing={3}>
      <GroupedMissionsSection
        title="🥇 GRUPALES – PRIORIDAD ALTA 🥇"
        entries={grupalesAlta}
        onHideMission={onHideMission}
      />

      <GroupedMissionsSection
        title="🌓 GRUPALES – PRIORIDAD MEDIA 🌓"
        entries={grupalesMedia}
        onHideMission={onHideMission}
      />

      <IndividualAccountsSection
        title="🔥 INDIVIDUALES – PRIORIDAD ALTA (3 MISIONES) 🔥"
        accounts={board.individualesAlta}
        groupedMissionNames={groupedMissionNames}
      />

      <IndividualAccountsSection
        title="🔻 INDIVIDUALES – PRIORIDAD BAJA (2 MISIONES) 🔻"
        accounts={board.individualesBaja}
      />
    </Stack>
  );
}
