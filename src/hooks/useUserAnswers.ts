import { useState, useEffect, useCallback } from 'react';
import { UserAnswers } from '../types/questions';
import { loadAnswers, saveAnswers } from '../utils/storage';

/**
 * Hook customizado para gerenciar respostas do usuário
 */
export function useUserAnswers() {
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});

  useEffect(() => {
    setUserAnswers(loadAnswers());
  }, []);

  const handleAnswerChange = useCallback((questionId: string, answer: any) => {
    // Atualização funcional: garante que várias chamadas em sequência
    // (ex.: limpar/ligar vários itens) partam sempre do estado mais recente.
    setUserAnswers((prev) => {
      const updatedAnswers = { ...prev, [questionId]: answer };
      saveAnswers(updatedAnswers);
      return updatedAnswers;
    });
  }, []);

  return {
    userAnswers,
    handleAnswerChange,
    setUserAnswers,
  };
}

