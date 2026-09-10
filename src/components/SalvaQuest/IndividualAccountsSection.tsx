// R > src/components/SalvaQuest/IndividualAccountsSection.tsx

import { Box, Chip, Paper, Stack, Typography } from '@mui/material';
import type { ParsedAccount } from '../../types/mission.types';

interface IndividualAccountsSectionProps {
  title: string;
  accounts: ParsedAccount[];
  emptyLabel: string;
}

export function IndividualAccountsSection({
  title,
  accounts,
  emptyLabel,
}: IndividualAccountsSectionProps) {
  return (
    <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      {accounts.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {emptyLabel}
        </Typography>
      ) : (
        <Stack spacing={2}>
          {accounts.map((account) => (
            <Box key={account.name}>
              <Typography variant="subtitle1" fontWeight={600}>
                {account.name}
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 0.5 }}>
                {account.missions.map((mission) => (
                  <Chip
                    key={`${account.name}-${mission.name}`}
                    label={mission.name}
                    size="small"
                    variant="outlined"
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
