// R > src/services/missionClassifier.service.ts

import type {
  AccountMissionRef,
  ClassifiedBoard,
  GroupedMissionEntry,
  ParsedAccount,
} from '../types/mission.types';

// misiones que quedan afuera de las secciones grupales por completo,
// sea cual sea la variante (ej: "Husk Extermination (Ninja)" también cuenta)
const EXCLUDED_GROUP_PREFIXES = [
  'Husk Extermination',
  'Mission Specialist',
  'Party of 25',
  'Mission Veteran',
  'All Together Now',
];

function isExcludedFromGroups(missionName: string): boolean {
  return EXCLUDED_GROUP_PREFIXES.some((prefix) => missionName.startsWith(prefix));
}

function isHuskExtermination(missionName: string): boolean {
  return missionName.startsWith('Husk Extermination');
}

export function formatAccountLabel(ref: AccountMissionRef): string {
  const suffix = ref.missionCount === 3 ? ' ✅' : '';
  const misionLabel = ref.missionCount === 1 ? 'misión' : 'misiones';
  return `${ref.accountName} (${ref.missionCount} ${misionLabel})${suffix}`;
}

function buildGroupedEntries(accounts: ParsedAccount[]): GroupedMissionEntry[] {
  const missionToAccounts = new Map<string, AccountMissionRef[]>();

  for (const account of accounts) {
    const missionCount = account.missions.length;

    for (const mission of account.missions) {
      if (isExcludedFromGroups(mission.name)) continue;

      const refs = missionToAccounts.get(mission.name) ?? [];

      // por si el texto trae la misma misión repetida para la misma cuenta
      if (!refs.some((ref) => ref.accountName === account.name)) {
        refs.push({ accountName: account.name, missionCount });
      }

      missionToAccounts.set(mission.name, refs);
    }
  }

  const entries: GroupedMissionEntry[] = [];

  missionToAccounts.forEach((refs, missionName) => {
    if (refs.length < 2) return; // no coincide entre cuentas, no es grupal

    const hasThreeMissionAccount = refs.some((ref) => ref.missionCount === 3);

    entries.push({
      missionName,
      accounts: refs,
      priority: hasThreeMissionAccount ? 'alta' : 'media',
      hasThreeMissionAccount,
    });
  });

  return entries;
}

function sortGroupEntries(entries: GroupedMissionEntry[]): GroupedMissionEntry[] {
  return [...entries].sort((a, b) => {
    const threeCountA = a.accounts.filter((ref) => ref.missionCount === 3).length;
    const threeCountB = b.accounts.filter((ref) => ref.missionCount === 3).length;

    if (threeCountB !== threeCountA) return threeCountB - threeCountA;
    if (b.accounts.length !== a.accounts.length) return b.accounts.length - a.accounts.length;

    return a.missionName.localeCompare(b.missionName, 'es');
  });
}

export function classifyMissions(accounts: ParsedAccount[]): ClassifiedBoard {
  const groupedEntries = buildGroupedEntries(accounts);

  const grupalesAlta = sortGroupEntries(groupedEntries.filter((e) => e.priority === 'alta'));
  const grupalesMedia = sortGroupEntries(groupedEntries.filter((e) => e.priority === 'media'));

  const individualesAlta = accounts.filter((account) => account.missions.length === 3);

  const individualesBaja = accounts.filter(
    (account) =>
      account.missions.length === 2 &&
      account.missions.every((mission) => isHuskExtermination(mission.name)),
  );

  return { grupalesAlta, grupalesMedia, individualesAlta, individualesBaja };
}
