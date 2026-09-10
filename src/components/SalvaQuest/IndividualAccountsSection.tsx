// R > src/components/SalvaQuest/IndividualAccountsSection.tsx

import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import type { ParsedAccount } from '../../types/mission.types';

interface IndividualAccountsSectionProps {
  title: string;
  accounts: ParsedAccount[];
  groupedMissionNames?: Set<string>;
}

export function IndividualAccountsSection({
  title,
  accounts,
  groupedMissionNames = new Set(),
}: IndividualAccountsSectionProps) {
  if (accounts.length === 0) return null;

  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
      <Stack direction="row" alignItems="baseline" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          ({accounts.length} {accounts.length === 1 ? 'cuenta' : 'cuentas'})
        </Typography>
      </Stack>

      <Stack spacing={2}>
        {accounts.map((account) => (
          <Box key={account.name}>
            <Typography variant="subtitle1" fontWeight={600}>
              {account.name}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 0.5 }}>
              {account.missions.map((mission) => {
                const isAlsoGrouped = groupedMissionNames.has(mission.name);
                return (
                  <Chip
                    key={`${account.name}-${mission.name}`}
                    label={mission.name}
                    size="small"
                    variant={isAlsoGrouped ? 'filled' : 'outlined'}
                    color={isAlsoGrouped ? 'success' : 'default'}
                  />
                );
              })}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
