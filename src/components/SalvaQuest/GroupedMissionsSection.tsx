// R > src/components/SalvaQuest/GroupedMissionsSection.tsx

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import type { AccountMissionRef, GroupedMissionEntry } from '../../types/mission.types';
import { formatAccountLabel } from '../../services/missionClassifier.service';
import {
  namesHaveComboMissions,
  resolveMissionColor,
  sortByMissionDisplayOrder,
} from '../../services/missionColors.service';

interface GroupedMissionsSectionProps {
  title: string;
  entries: GroupedMissionEntry[];
  groupedMissionNames: Set<string>;
  onHideMission: (missionName: string) => void;
}

/**
 * Cuenta en cuántas misiones de esta sección aparece cada cuenta. Nos sirve
 * para destacar las que tienen 3 misiones activas y además están en más de
 * una grupal: esas son las que más conviene arrancar primero, porque se
 * pueden encadenar con otras cuentas en la misma situación.
 */
function buildAppearanceCount(entries: GroupedMissionEntry[]): Map<string, number> {
  const counts = new Map<string, number>();

  for (const entry of entries) {
    for (const accountRef of entry.accounts) {
      counts.set(accountRef.accountName, (counts.get(accountRef.accountName) ?? 0) + 1);
    }
  }

  return counts;
}

function isKeyAccount(accountRef: AccountMissionRef, appearances: Map<string, number>): boolean {
  return accountRef.missionCount === 3 && (appearances.get(accountRef.accountName) ?? 0) >= 2;
}

interface AccountTooltipContentProps {
  missions: string[];
  hasComboMissions: boolean;
  groupedMissionNames: Set<string>;
}

function AccountTooltipContent({
  missions,
  hasComboMissions,
  groupedMissionNames,
}: AccountTooltipContentProps) {
  if (missions.length === 0) {
    return (
      <Typography variant="caption" component="span">
        No tiene otras misiones activas
      </Typography>
    );
  }

  // mismo orden y colores que en individuales: Husk, verdes, resto
  const sortedMissions = sortByMissionDisplayOrder(
    missions,
    (missionName) => missionName,
    groupedMissionNames,
  );

  return (
    <Stack spacing={0.25} sx={{ py: 0.5 }}>
      {sortedMissions.map((missionName) => (
        <Typography
          key={missionName}
          variant="caption"
          component="span"
          sx={{
            color: resolveMissionColor(
              missionName,
              hasComboMissions,
              groupedMissionNames.has(missionName),
            ),
          }}
        >
          {missionName}
        </Typography>
      ))}
    </Stack>
  );
}

interface AccountRowProps {
  accountRef: AccountMissionRef;
  currentMissionName: string;
  isKey: boolean;
  groupedMissionNames: Set<string>;
}

function AccountRow({ accountRef, currentMissionName, isKey, groupedMissionNames }: AccountRowProps) {
  // en el tooltip no tiene sentido repetir la misión sobre la que ya estás
  // parado, mostramos solo el resto de las misiones de esa cuenta
  const otherMissions = accountRef.missions.filter((name) => name !== currentMissionName);

  // el combo se evalúa sobre TODAS las misiones de la cuenta, no solo las que
  // quedan después de filtrar la actual
  const hasComboMissions = namesHaveComboMissions(accountRef.missions);

  return (
    <Tooltip
      title={
        <AccountTooltipContent
          missions={otherMissions}
          hasComboMissions={hasComboMissions}
          groupedMissionNames={groupedMissionNames}
        />
      }
      placement="right"
      arrow
    >
      <Typography
        variant="body2"
        sx={{
          cursor: 'default',
          width: 'fit-content',
          fontWeight: isKey ? 700 : 400,
          color: accountRef.missionCount === 3 ? 'success.main' : 'text.primary',
        }}
      >
        {formatAccountLabel(accountRef)}
      </Typography>
    </Tooltip>
  );
}

export function GroupedMissionsSection({
  title,
  entries,
  groupedMissionNames,
  onHideMission,
}: GroupedMissionsSectionProps) {
  if (entries.length === 0) return null;

  const appearances = buildAppearanceCount(entries);

  // las misiones que involucran cuentas clave van arriba de todo; el resto
  // conserva el orden que ya trae el clasificador (sort estable)
  const sortedEntries = [...entries].sort((a, b) => {
    const aHasKey = a.accounts.some((accountRef) => isKeyAccount(accountRef, appearances));
    const bHasKey = b.accounts.some((accountRef) => isKeyAccount(accountRef, appearances));
    return Number(bHasKey) - Number(aHasKey);
  });

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, border: 1, borderColor: 'divider', borderRadius: 1 }}>
      <Stack direction="row" alignItems="baseline" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          ({entries.length} {entries.length === 1 ? 'misión' : 'misiones'})
        </Typography>
      </Stack>

      <Stack spacing={2.5}>
        {sortedEntries.map((entry) => (
          <Box key={entry.missionName}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="subtitle1" fontWeight={600}>
                {entry.missionName}
              </Typography>
              <Tooltip title="Ya la completé, sacarla de la lista" placement="right" arrow>
                <IconButton
                  size="small"
                  onClick={() => onHideMission(entry.missionName)}
                  aria-label={`Ocultar misión ${entry.missionName}`}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
            <Stack spacing={0.25} sx={{ mt: 0.5 }}>
              {entry.accounts.map((accountRef) => (
                <AccountRow
                  key={accountRef.accountName}
                  accountRef={accountRef}
                  currentMissionName={entry.missionName}
                  isKey={isKeyAccount(accountRef, appearances)}
                  groupedMissionNames={groupedMissionNames}
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
