// R > src/hooks/useSalvaQuestBoard.ts

import { useCallback, useState } from 'react';
import type { BoardStatus, ClassifiedBoard } from '../types/mission.types';
import { parseMissionsText } from '../services/missionParser.service';
import { classifyMissions } from '../services/missionClassifier.service';

interface UseSalvaQuestBoardResult {
  status: BoardStatus;
  board: ClassifiedBoard | null;
  accountsProcessed: number;
  errorMessage: string | null;
  isProcessing: boolean;
  hiddenMissionNames: Set<string>;
  handleConfirm: () => Promise<void>;
  handleClear: () => void;
  handleHideMission: (missionName: string) => void;
}

export function useSalvaQuestBoard(): UseSalvaQuestBoardResult {
  const [status, setStatus] = useState<BoardStatus>('empty');
  const [board, setBoard] = useState<ClassifiedBoard | null>(null);
  const [accountsProcessed, setAccountsProcessed] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hiddenMissionNames, setHiddenMissionNames] = useState<Set<string>>(new Set());

  const handleConfirm = useCallback(async () => {
    setIsProcessing(true);
    setErrorMessage(null);

    let clipboardText = '';

    try {
      clipboardText = await navigator.clipboard.readText();
    } catch (err) {
      // esto pasa típicamente si el navegador no dio permiso de portapapeles
      console.log('[useSalvaQuestBoard] No se pudo leer el portapapeles:', err);
      setStatus('error');
      setErrorMessage(
        'No pude acceder al portapapeles. Revisá que le hayas dado permiso al navegador ' +
          'y que hayas copiado el texto antes de tocar Confirmar.',
      );
      setBoard(null);
      setIsProcessing(false);
      return;
    }

    if (!clipboardText.trim()) {
      setStatus('error');
      setErrorMessage('El portapapeles está vacío. Copiá el listado de misiones y volvé a tocar Confirmar.');
      setBoard(null);
      setIsProcessing(false);
      return;
    }

    try {
      const accounts = parseMissionsText(clipboardText);

      if (accounts.length === 0) {
        console.log('[useSalvaQuestBoard] No se detectaron cuentas en el texto del portapapeles');
        setStatus('error');
        setErrorMessage(
          'No reconocí ninguna cuenta en lo que tenías copiado. Revisá que el formato sea el de siempre.',
        );
        setBoard(null);
        setIsProcessing(false);
        return;
      }

      const classified = classifyMissions(accounts);
      setBoard(classified);
      setAccountsProcessed(accounts.length);
      setHiddenMissionNames(new Set());
      setStatus('success');
    } catch (err) {
      console.log('[useSalvaQuestBoard] Error al procesar el texto de misiones:', err);
      setStatus('error');
      setErrorMessage('Ocurrió un error inesperado al procesar el texto copiado.');
      setBoard(null);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    setBoard(null);
    setAccountsProcessed(0);
    setErrorMessage(null);
    setHiddenMissionNames(new Set());
    setStatus('empty');
  }, []);

  const handleHideMission = useCallback((missionName: string) => {
    setHiddenMissionNames((previous) => {
      const next = new Set(previous);
      next.add(missionName);
      return next;
    });
  }, []);

  return {
    status,
    board,
    accountsProcessed,
    errorMessage,
    isProcessing,
    hiddenMissionNames,
    handleConfirm,
    handleClear,
    handleHideMission,
  };
}
