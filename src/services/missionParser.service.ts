// R > src/services/missionParser.service.ts

import type { ParsedAccount, ParsedMission } from '../types/mission.types';

const REROLLS_REGEX = /^Rerolls:\s*(\d+)/i;
const QUEST_ID_REGEX = /^Quest:/i;
const PROGRESS_REGEX = /^(\d+)\s*\/\s*(\d+)$/;

/**
 * Parsea el texto de exportación de misiones diarias (Fortnite STW) al formato
 * que venimos usando siempre:
 *
 *   NombreCuenta
 *   Rerolls: N
 *   NombreMision
 *   Quest:id_de_la_mision
 *   xp
 *   recurso
 *   progresoActual/progresoObjetivo
 *   ... (se repite un bloque de 5 líneas por cada misión de la cuenta)
 *
 * Una cuenta nueva arranca cuando la línea siguiente matchea "Rerolls: N".
 * Si el texto viene con basura o algún bloque incompleto, lo salteamos en vez
 * de explotar, para no colgar el flujo por un typo del pegado.
 */
export function parseMissionsText(rawText: string): ParsedAccount[] {
  const lines = rawText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const accounts: ParsedAccount[] = [];
  let currentAccount: ParsedAccount | null = null;
  let i = 0;

  while (i < lines.length) {
    const nextLine = lines[i + 1];
    const rerollsMatch = nextLine ? nextLine.match(REROLLS_REGEX) : null;

    if (rerollsMatch) {
      currentAccount = {
        name: lines[i],
        rerolls: Number(rerollsMatch[1]),
        missions: [],
      };
      accounts.push(currentAccount);
      i += 2;
      continue;
    }

    if (!currentAccount) {
      // todavía no encontramos el header de ninguna cuenta, esta línea es ruido
      i += 1;
      continue;
    }

    const missionName = lines[i];
    const questIdLine = lines[i + 1];

    if (!questIdLine || !QUEST_ID_REGEX.test(questIdLine)) {
      // no matchea el formato de bloque de misión esperado, avanzamos de a una
      // para no perder el resto del texto por un bloque roto
      i += 1;
      continue;
    }

    const xpReward = Number(lines[i + 2] ?? 0);
    const resourceReward = Number(lines[i + 3] ?? 0);
    const progressLine = lines[i + 4] ?? '';
    const progressMatch = progressLine.match(PROGRESS_REGEX);

    const mission: ParsedMission = {
      name: missionName,
      questId: questIdLine.replace(QUEST_ID_REGEX, ''),
      xpReward,
      resourceReward,
      progressCurrent: progressMatch ? Number(progressMatch[1]) : 0,
      progressTarget: progressMatch ? Number(progressMatch[2]) : 0,
    };

    currentAccount.missions.push(mission);
    i += 5;
  }

  return accounts;
}
