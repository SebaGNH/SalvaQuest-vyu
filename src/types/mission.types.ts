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
}

export type BoardStatus = 'empty' | 'success' | 'error';
