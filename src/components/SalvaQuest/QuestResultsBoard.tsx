// R > src/components/SalvaQuest/QuestResultsBoard.tsx

import { Alert, Stack } from '@mui/material';
import type { BoardStatus, BoardViewMode, ClassifiedBoard } from '../../types/mission.types';
import { GroupedMissionsSection } from './GroupedMissionsSection';
import { IndividualAccountsSection } from './IndividualAccountsSection';

const HINT_TEXT =
  'Copiá el listado de cuentas con sus misiones (Ctrl+C / Cmd+C) y tocá Pegar. Lo tomamos directo del portapapeles, no hace falta pegarlo a mano.';

interface QuestResultsBoardProps {
  status: BoardStatus;
  viewMode: BoardViewMode;
  board: ClassifiedBoard | null;
  errorMessage: string | null;
  hiddenMissionNames: Set<string>;
  hiddenAccountNames: Set<string>;
  onHideMission: (missionName: string) => void;
  onHideAccount: (accountName: string) => void;
}

export function QuestResultsBoard({
  status,
  viewMode,
  board,
  errorMessage,
  hiddenMissionNames,
  hiddenAccountNames,
  onHideMission,
  onHideAccount,
}: QuestResultsBoardProps) {
  if (status === 'empty') {
    return <Alert severity="info">{HINT_TEXT}</Alert>;
  }

  if (status === 'error' || !board) {
    return (
      <Alert severity="error">
        {errorMessage ??
          'No pude reconocer ninguna cuenta en el texto copiado. Revisá que el formato sea el de siempre.'}
      </Alert>
    );
  }

  // las misiones y cuentas que el usuario fue marcando como completadas se
  // sacan de las listas correspondientes
  const grupalesAlta = board.grupalesAlta.filter((entry) => !hiddenMissionNames.has(entry.missionName));
  const grupalesMedia = board.grupalesMedia.filter((entry) => !hiddenMissionNames.has(entry.missionName));
  const individualesAlta = board.individualesAlta.filter((account) => !hiddenAccountNames.has(account.name));
  const individualesBaja = board.individualesBaja.filter((account) => !hiddenAccountNames.has(account.name));

  const groupedMissionNames = new Set([
    ...grupalesAlta.map((entry) => entry.missionName),
    ...grupalesMedia.map((entry) => entry.missionName),
  ]);

  // vista "Listar": todas las cuentas con todas sus misiones, sin tocar lo
  // que se ocultó en la clasificación (al volver sigue todo como estaba)
  if (viewMode === 'allMissions') {
    return (
      <IndividualAccountsSection
        title="TODAS LAS MISIONES POR CUENTA"
        accounts={board.allAccounts}
        groupedMissionNames={groupedMissionNames}
      />
    );
  }

  const nothingToShow =
    grupalesAlta.length === 0 &&
    grupalesMedia.length === 0 &&
    individualesAlta.length === 0 &&
    individualesBaja.length === 0;

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
        groupedMissionNames={groupedMissionNames}
        onHideMission={onHideMission}
      />

      <GroupedMissionsSection
        title="🌓 GRUPALES – PRIORIDAD MEDIA 🌓"
        entries={grupalesMedia}
        groupedMissionNames={groupedMissionNames}
        onHideMission={onHideMission}
      />

      <IndividualAccountsSection
        title="🔥 INDIVIDUALES – PRIORIDAD ALTA (3 MISIONES) 🔥"
        accounts={individualesAlta}
        groupedMissionNames={groupedMissionNames}
        onHideAccount={onHideAccount}
      />

      <IndividualAccountsSection
        title="🔻 INDIVIDUALES – PRIORIDAD BAJA (2 MISIONES) 🔻"
        accounts={individualesBaja}
        onHideAccount={onHideAccount}
      />
    </Stack>
  );
}
