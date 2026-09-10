// R > src/components/SalvaQuest/GroupedMissionsSection.tsx

import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import type { AccountMissionRef, GroupedMissionEntry } from '../../types/mission.types';
import { formatAccountLabel } from '../../services/missionClassifier.service';

interface GroupedMissionsSectionProps {
  title: string;
  entries: GroupedMissionEntry[];
  onHideMission: (missionName: string) => void;
}

function AccountTooltipContent({ missions }: { missions: string[] }) {
  if (missions.length === 0) {
    return (
      <Typography variant="caption" component="span">
        No tiene otras misiones activas
      </Typography>
    );
  }

  return (
    <Stack spacing={0.25} sx={{ py: 0.5 }}>
      {missions.map((missionName) => (
        <Typography key={missionName} variant="caption" component="span">
          {missionName}
        </Typography>
      ))}
    </Stack>
  );
}

interface AccountRowProps {
  accountRef: AccountMissionRef;
  currentMissionName: string;
}

function AccountRow({ accountRef, currentMissionName }: AccountRowProps) {
  // en el tooltip no tiene sentido repetir la misión sobre la que ya estás
  // parado, mostramos solo el resto de las misiones de esa cuenta
  const otherMissions = accountRef.missions.filter((name) => name !== currentMissionName);

  return (
    <Tooltip title={<AccountTooltipContent missions={otherMissions} />} placement="right" arrow>
      <Typography
        variant="body2"
        sx={{
          cursor: 'default',
          width: 'fit-content',
          fontWeight: accountRef.missionCount === 3 ? 600 : 400,
          color: accountRef.missionCount === 3 ? 'success.main' : 'text.primary',
        }}
      >
        {formatAccountLabel(accountRef)}
      </Typography>
    </Tooltip>
  );
}

export function GroupedMissionsSection({ title, entries, onHideMission }: GroupedMissionsSectionProps) {
  if (entries.length === 0) return null;

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, border: 1, borderColor: 'divider', borderRadius: 1 }}>
      <Stack direction="row" alignItems="baseline" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          ({entries.length} {entries.length === 1 ? 'misión' : 'misiones'})
        </Typography>
      </Stack>

      <Stack spacing={2.5}>
        {entries.map((entry) => (
          <Box key={entry.missionName}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography variant="subtitle1" fontWeight={600}>
                {entry.missionName}
              </Typography>
              <Tooltip title="Ya la completé, sacarla de la lista">
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
                />
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
