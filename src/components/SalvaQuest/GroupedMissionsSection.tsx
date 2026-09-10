// R > src/components/SalvaQuest/GroupedMissionsSection.tsx

import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import type { GroupedMissionEntry } from '../../types/mission.types';
import { formatAccountLabel } from '../../services/missionClassifier.service';

interface GroupedMissionsSectionProps {
  title: string;
  entries: GroupedMissionEntry[];
  emptyLabel: string;
}

export function GroupedMissionsSection({ title, entries, emptyLabel }: GroupedMissionsSectionProps) {
  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      {entries.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {emptyLabel}
        </Typography>
      ) : (
        <Stack spacing={2}>
          {entries.map((entry) => (
            <Box key={entry.missionName}>
              <Typography variant="subtitle1" fontWeight={600}>
                {entry.missionName}
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 0.5 }}>
                {entry.accounts.map((ref) => (
                  <Chip
                    key={ref.accountName}
                    label={formatAccountLabel(ref)}
                    color={ref.missionCount === 3 ? 'success' : 'default'}
                    variant={ref.missionCount === 3 ? 'filled' : 'outlined'}
                    size="small"
                  />
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Paper>
  );
}
