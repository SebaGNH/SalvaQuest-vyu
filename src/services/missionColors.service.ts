// R > src/services/missionColors.service.ts

import type { ParsedMission } from '../types/mission.types';

// paleta pensada para que se lea bien sobre el fondo oscuro del theme
const HUSK_EXTERMINATION_COLOR = '#c792ea'; // morado suave
const MISSION_SPECIALIST_COLOR = '#d2986c'; // marrón rojizo
const COMBO_MISSION_COLOR = '#4fc3f7'; // celeste

// mismo verde que usamos para "3 misiones" en la sección de grupales
export const GROUPED_TEXT_COLOR = 'success.main';

// "All Together Now" y "Party of 25" solo se resaltan si la MISMA cuenta
// tiene las dos activas a la vez
const COMBO_MISSION_NAMES = ['All Together Now', 'Party of 25'];

export function namesHaveComboMissions(missionNames: string[]): boolean {
  return COMBO_MISSION_NAMES.every((comboName) => missionNames.includes(comboName));
}

export function accountHasComboMissions(missions: ParsedMission[]): boolean {
  return namesHaveComboMissions(missions.map((mission) => mission.name));
}

/**
 * Color de texto por tipo de misión, o undefined si no aplica ninguna regla
 * especial (queda con el color de texto normal).
 *
 * "hasComboMissions" indica si la cuenta dueña de esta misión tiene a la vez
 * "All Together Now" y "Party of 25"; si no, esas dos no se resaltan.
 */
export function getMissionTextColor(missionName: string, hasComboMissions: boolean): string | undefined {
  if (hasComboMissions && COMBO_MISSION_NAMES.includes(missionName)) {
    return COMBO_MISSION_COLOR;
  }

  if (missionName.startsWith('Husk Extermination')) {
    return HUSK_EXTERMINATION_COLOR;
  }

  if (missionName.startsWith('Mission Specialist')) {
    return MISSION_SPECIALIST_COLOR;
  }

  return undefined;
}

/**
 * Color final de una misión: primero las reglas por tipo y, si no aplica
 * ninguna, verde cuando la misión también está en las secciones grupales.
 */
export function resolveMissionColor(
  missionName: string,
  hasComboMissions: boolean,
  isAlsoGrouped: boolean,
): string | undefined {
  return getMissionTextColor(missionName, hasComboMissions) ?? (isAlsoGrouped ? GROUPED_TEXT_COLOR : undefined);
}

// orden de lectura: primero Husk Extermination, después las que también son
// grupales (verdes), por último el resto tal cual vienen
function getMissionOrderCategory(missionName: string, isAlsoGrouped: boolean): number {
  if (missionName.startsWith('Husk Extermination')) return 0;
  if (isAlsoGrouped) return 1;
  return 2;
}

export function sortByMissionDisplayOrder<T>(
  items: T[],
  getMissionName: (item: T) => string,
  groupedMissionNames: Set<string>,
): T[] {
  return [...items].sort((a, b) => {
    const nameA = getMissionName(a);
    const nameB = getMissionName(b);
    return (
      getMissionOrderCategory(nameA, groupedMissionNames.has(nameA)) -
      getMissionOrderCategory(nameB, groupedMissionNames.has(nameB))
    );
  });
}
