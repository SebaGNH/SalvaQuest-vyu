// R > src/types/mission.types.ts

export interface ParsedMission {
  name: string;
  questId: string;
  xpReward: number;
  resourceReward: number;
  progressCurrent: number;
  progressTarget: number;
}

export interface ParsedAccount {
  name: string;
  rerolls: number;
  missions: ParsedMission[];
}

export type MissionPriority = 'alta' | 'media';

export interface AccountMissionRef {
  accountName: string;
  missionCount: number;
  missions: string[];
}

export interface GroupedMissionEntry {
  missionName: string;
  accounts: AccountMissionRef[];
  priority: MissionPriority;
  hasThreeMissionAccount: boolean;
}

export interface ClassifiedBoard {
  grupalesAlta: GroupedMissionEntry[];
  grupalesMedia: GroupedMissionEntry[];
  individualesAlta: ParsedAccount[];
  individualesBaja: ParsedAccount[];
  // todas las cuentas tal cual se pegaron, para la vista "Listar"
  allAccounts: ParsedAccount[];
}

export type BoardStatus = 'empty' | 'success' | 'error';

// 'classification' = grupales + individuales, 'allMissions' = listado completo por cuenta
export type BoardViewMode = 'classification' | 'allMissions';
