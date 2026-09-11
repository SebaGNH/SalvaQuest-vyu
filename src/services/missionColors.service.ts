// R > src/services/missionColors.service.ts

import type { ParsedMission } from '../types/mission.types';

// paleta pensada para que se lea bien sobre el fondo oscuro del theme
const HUSK_EXTERMINATION_COLOR = '#c792ea'; // morado suave
const MISSION_SPECIALIST_COLOR = '#d2986c'; // marrón rojizo
const COMBO_MISSION_COLOR = '#4fc3f7'; // celeste

// "All Together Now" y "Party of 25" solo se resaltan si la MISMA cuenta
// tiene las dos activas a la vez
const COMBO_MISSION_NAMES = ['All Together Now', 'Party of 25'];

export function accountHasComboMissions(missions: ParsedMission[]): boolean {
  return COMBO_MISSION_NAMES.every((comboName) =>
    missions.some((mission) => mission.name === comboName),
  );
}

/**
 * Devuelve el color de texto para una misión puntual, o undefined si no
 * aplica ninguna regla especial (se queda con el color de texto normal).
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
