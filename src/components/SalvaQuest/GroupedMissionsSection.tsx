// R > src/components/SalvaQuest/GroupedMissionsSection.tsx

import { Box, Stack, Tooltip, Typography } from '@mui/material';
import type { AccountMissionRef, GroupedMissionEntry } from '../../types/mission.types';
import { formatAccountLabel } from '../../services/missionClassifier.service';

interface GroupedMissionsSectionProps {
  title: string;
  entries: GroupedMissionEntry[];
  emptyLabel: string;
}

function AccountTooltipContent({ missions }: { missions: string[] }) {
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

function AccountRow({ accountRef }: { accountRef: AccountMissionRef }) {
  return (
    <Tooltip title={<AccountTooltipContent missions={accountRef.missions} />} placement="right" arrow>
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

export function GroupedMissionsSection({ title, entries, emptyLabel }: GroupedMissionsSectionProps) {
  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, border: 1, borderColor: 'divider', borderRadius: 1 }}>
      <Stack direction="row" alignItems="baseline" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          ({entries.length} {entries.length === 1 ? 'misión' : 'misiones'})
        </Typography>
      </Stack>

      {entries.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {emptyLabel}
        </Typography>
      ) : (
        <Stack spacing={2.5}>
          {entries.map((entry) => (
            <Box key={entry.missionName}>
              <Typography variant="subtitle1" fontWeight={600}>
                {entry.missionName}
              </Typography>
              <Stack spacing={0.25} sx={{ mt: 0.5 }}>
                {entry.accounts.map((accountRef) => (
                  <AccountRow key={accountRef.accountName} accountRef={accountRef} />
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
