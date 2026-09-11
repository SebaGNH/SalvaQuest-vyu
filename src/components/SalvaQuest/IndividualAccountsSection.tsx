// R > src/components/SalvaQuest/IndividualAccountsSection.tsx

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import type { ParsedAccount, ParsedMission } from '../../types/mission.types';
import { accountHasComboMissions, getMissionTextColor } from '../../services/missionColors.service';

interface IndividualAccountsSectionProps {
  title: string;
  accounts: ParsedAccount[];
  groupedMissionNames?: Set<string>;
  onHideAccount: (accountName: string) => void;
}

// mismo verde que usamos para "3 misiones ✅" en la sección de grupales
const GROUPED_TEXT_COLOR = 'success.main';

// orden de lectura: primero Husk Extermination, después las que también son
// grupales (verdes), por último el resto tal cual vienen
function getMissionOrderCategory(missionName: string, isAlsoGrouped: boolean): number {
  if (missionName.startsWith('Husk Extermination')) return 0;
  if (isAlsoGrouped) return 1;
  return 2;
}

function sortMissionsForDisplay(
  missions: ParsedMission[],
  groupedMissionNames: Set<string>,
): ParsedMission[] {
  return [...missions].sort((a, b) => {
    const categoryA = getMissionOrderCategory(a.name, groupedMissionNames.has(a.name));
    const categoryB = getMissionOrderCategory(b.name, groupedMissionNames.has(b.name));
    return categoryA - categoryB;
  });
}

export function IndividualAccountsSection({
  title,
  accounts,
  groupedMissionNames = new Set(),
  onHideAccount,
}: IndividualAccountsSectionProps) {
  if (accounts.length === 0) return null;

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, border: 1, borderColor: 'divider', borderRadius: 1 }}>
      <Stack direction="row" alignItems="baseline" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          ({accounts.length} {accounts.length === 1 ? 'cuenta' : 'cuentas'})
        </Typography>
      </Stack>

      <Stack spacing={2.5}>
        {accounts.map((account) => {
          const hasComboMissions = accountHasComboMissions(account.missions);
          const sortedMissions = sortMissionsForDisplay(account.missions, groupedMissionNames);

          return (
            <Box key={account.name}>
              <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {account.name}
                </Typography>
                <Tooltip title="Ya la completé, sacarla de la lista" placement="right" arrow>
                  <IconButton
                    size="small"
                    onClick={() => onHideAccount(account.name)}
                    aria-label={`Ocultar cuenta ${account.name}`}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Stack>

              <Stack spacing={0.25} sx={{ mt: 0.5 }}>
                {sortedMissions.map((mission) => {
                  const isAlsoGrouped = groupedMissionNames.has(mission.name);
                  const specialColor = getMissionTextColor(mission.name, hasComboMissions);
                  const textColor = specialColor ?? (isAlsoGrouped ? GROUPED_TEXT_COLOR : undefined);

                  return (
                    <Typography
                      key={`${account.name}-${mission.name}`}
                      variant="body2"
                      sx={{ color: textColor }}
                    >
                      {mission.name}
                    </Typography>
                  );
                })}
              </Stack>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
