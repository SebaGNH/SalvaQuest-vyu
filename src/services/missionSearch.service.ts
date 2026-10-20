// R > src/services/missionSearch.service.ts

import type { ParsedAccount } from '../types/mission.types';

export interface AccountListPartition {
  // cuentas que tienen la misión buscada (o todas las que tienen misiones si no se busca nada)
  matching: ParsedAccount[];
  // cuentas con misiones pero ninguna coincide con lo buscado
  notMatching: ParsedAccount[];
  // cuentas sin ninguna misión disponible, siempre al final
  withoutMissions: ParsedAccount[];
}

// minúsculas y sin tildes, para que "scouting" encuentre "Scouting" y
// "mision" encuentre "misión" sin que el usuario se preocupe por eso
export function normalizeSearchText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function missionMatchesTokens(missionName: string, tokens: string[]): boolean {
  const normalizedName = normalizeSearchText(missionName);
  return tokens.every((token) => normalizedName.includes(token));
}

/**
 * Parte las cuentas del listado en tres grupos. La búsqueda separa el texto en
 * palabras y una misión coincide si contiene TODAS: "destroy tv" encuentra
 * "Daily Destroy (TVs)" aunque no esté escrito en ese orden exacto.
 */
export function partitionAccountsForList(accounts: ParsedAccount[], query: string): AccountListPartition {
  const withoutMissions = accounts.filter((account) => account.missions.length === 0);
  const withMissions = accounts.filter((account) => account.missions.length > 0);

  const tokens = normalizeSearchText(query).split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    return { matching: withMissions, notMatching: [], withoutMissions };
  }

  const matching: ParsedAccount[] = [];
  const notMatching: ParsedAccount[] = [];

  for (const account of withMissions) {
    const hasMatch = account.missions.some((mission) => missionMatchesTokens(mission.name, tokens));
    (hasMatch ? matching : notMatching).push(account);
  }

  return { matching, notMatching, withoutMissions };
}
