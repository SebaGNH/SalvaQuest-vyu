// R > src/hooks/useSalvaQuestBoard.ts

import { useCallback, useState } from 'react';
import type { BoardStatus, ClassifiedBoard } from '../types/mission.types';
import { parseMissionsText } from '../services/missionParser.service';
import { classifyMissions } from '../services/missionClassifier.service';

interface UseSalvaQuestBoardResult {
  rawText: string;
  setRawText: (value: string) => void;
  status: BoardStatus;
  board: ClassifiedBoard | null;
  accountsProcessed: number;
  handleConfirm: () => void;
  handleClear: () => void;
}

export function useSalvaQuestBoard(): UseSalvaQuestBoardResult {
  const [rawText, setRawText] = useState('');
  const [status, setStatus] = useState<BoardStatus>('empty');
  const [board, setBoard] = useState<ClassifiedBoard | null>(null);
  const [accountsProcessed, setAccountsProcessed] = useState(0);

  const handleConfirm = useCallback(() => {
    if (!rawText.trim()) {
      setStatus('empty');
      setBoard(null);
      return;
    }

    try {
      const accounts = parseMissionsText(rawText);

      if (accounts.length === 0) {
        console.log('[useSalvaQuestBoard] No se detectaron cuentas en el texto pegado');
        setStatus('error');
        setBoard(null);
        return;
      }

      const classified = classifyMissions(accounts);
      setBoard(classified);
      setAccountsProcessed(accounts.length);
      setStatus('success');
    } catch (err) {
      console.log('[useSalvaQuestBoard] Error al procesar el texto de misiones:', err);
      setStatus('error');
      setBoard(null);
    }
  }, [rawText]);

  const handleClear = useCallback(() => {
    setRawText('');
    setBoard(null);
    setAccountsProcessed(0);
    setStatus('empty');
  }, []);

  return { rawText, setRawText, status, board, accountsProcessed, handleConfirm, handleClear };
}
