export type QuestionType =
  | 'multiple-choice'
  | 'true-false'
  | 'alternative'
  | 'text-input'
  | 'table-fill'
  | 'fill-blanks'
  | 'ordering'
  | 'drawing'
  | 'word-paint'
  | 'matching'
  | 'image-word-complete'
  | 'alphabet-trail'
  | 'icon-describe'
  | 'quadrinha';

export interface MultipleChoiceQuestion {
  id: string;
  type: 'multiple-choice';
  question: string;
  number?: number;
  options: {
    a: string;
    b: string;
    c: string;
    d?: string;
  };
  correctAnswer: 'a' | 'b' | 'c' | 'd';
}

export interface TrueFalseQuestion {
  id: string;
  type: 'true-false';
  question: string;
  correctAnswer?: boolean; // Para compatibilidade com formato antigo (opcional quando há statements)
  number?: number; // Número da questão (ex: 2, 3, 4...)
  statements?: Array<{
    letter: string; // Letra da afirmação (ex: 'a', 'b', 'c')
    statement: string; // Texto da afirmação
    correctAnswer: boolean; // Se a afirmação é verdadeira ou falsa
    correction?: string; // Correção para afirmações falsas (opcional)
  }>;
  hasCorrectionBox?: boolean; // Se deve mostrar campo de texto para correções
  correctionPlaceholder?: string; // Placeholder para o campo de correção
}

export interface AlternativeQuestion {
  id: string;
  type: 'alternative';
  question: string;
  options: string[];
  correctAnswer: number;
  number?: number; // Número da questão (ex: 3, 4, 5...)
}

export interface TextInputQuestion {
  id: string;
  type: 'text-input';
  question: string;
  /** Se true, pergunta + campo ficam dentro de ul.list-disc (bullet roxo #80298F), como no livro impresso */
  listDiscLayout?: boolean;
  placeholder?: string;
  correctAnswer?: string; // Opcional, para validação na visão do professor
  number?: number; // Número da questão (ex: 1, 2, 3...)
  subQuestions?: Array<{
    letter: string; // Letra da subquestão (ex: 'a', 'b', 'c')
    question: string; // Texto da subquestão
    placeholder?: string;
    correctAnswer?: string;
    subItems?: Array<{
      label: string; // Rótulo da subquestão aninhada (ex: 'Situação inicial', 'Conflito', 'Desfecho')
      placeholder?: string;
      correctAnswer?: string;
    }>;
  }>;
  embeddedContent?: string; // Conteúdo a ser exibido em uma caixa (ex: versos do poema)
  embeddedContentMaxWidth?: string; // Largura máxima do conteúdo embutido (ex: '400px', '50%', 'fit-content')
  followUpQuestion?: string; // Pergunta adicional com bullet vermelho
}

export interface TableFillQuestion {
  id: string;
  type: 'table-fill';
  question?: string;
  number?: number;
  columns: string[];
  rows: Array<{
    id: string;
    [key: string]: string | undefined; // Permite campos dinâmicos: o primeiro campo corresponde à primeira coluna, os demais às outras colunas
  }>;
  correctAnswer?: {
    [fieldId: string]: string; // Mapeia fieldId (questionId_rowId_colN) para a resposta correta
  };
  subQuestions?: Array<{
    letter: string; // Letra da subquestão (ex: 'a', 'b', 'c')
    question: string; // Texto da subquestão
    placeholder?: string;
    correctAnswer?: string;
  }>;
}

export interface FillBlanksQuestion {
  id: string;
  type: 'fill-blanks';
  number?: number;
  question: string;
  items: Array<{
    letter: string; // Letra do item (ex: 'a', 'b', 'c')
    fragments: string[]; // Texto quebrado por lacunas. Ex: ["A troca ... de ", "."]
    placeholders?: string[]; // Placeholder por lacuna
    correctAnswers?: string[]; // Resposta esperada por lacuna (visão do professor)
  }>;
}

export interface OrderingQuestion {
  id: string;
  type: 'ordering';
  number?: number;
  question: string;
  items: Array<{
    id: string;
    text: string;
    correctOrder: number;
  }>;
}

/** Desenho livre em canvas; a resposta é salva como dataURL (PNG) */
export interface DrawingQuestion {
  id: string;
  type: 'drawing';
  number?: number;
  question: string;
  /** Texto de apoio exibido dentro da área de desenho (ex.: rótulo "BOLA") */
  label?: string;
  /** Altura da área de desenho em px (padrão 220) */
  height?: number;
  /** Oculta o enunciado do componente (útil quando o enunciado é exibido fora, em largura total) */
  hidePrompt?: boolean;
  /** Imagem de fundo (abaixo da label) sobre a qual o aluno desenha */
  bgImage?: string;
  /** Resposta/orientação esperada, exibida apenas na visão do professor */
  correctAnswer?: string;
}

/**
 * Seleção/pintura de palavras. Cada palavra pode ser "pintada" com uma cor da paleta.
 * - Paleta com 1 cor => funciona como seleção simples (marcar/desmarcar).
 * - Paleta com várias cores => agrupar por cor (ex.: rimas da mesma cor).
 * Resposta salva por palavra em `${id}_${index}` = cor (hex) escolhida.
 */
export interface WordPaintQuestion {
  id: string;
  type: 'word-paint';
  number?: number;
  question: string;
  words: string[];
  palette?: string[];
  /** Índices das palavras corretas (para seleção simples) */
  correctIndexes?: number[];
  /** Grupos de índices que devem receber a mesma cor (para atividades de rima) */
  correctGroups?: number[][];
  /** 'chips' (padrão) exibe em pílulas; 'lines' exibe cada item em uma linha (ex.: versos) */
  layout?: 'chips' | 'lines';
  /** Oculta o enunciado do componente (útil quando o texto já está no contexto) */
  hidePrompt?: boolean;
  /** Índices das palavras que devem ser exibidas em letra cursiva */
  cursiveIndexes?: number[];
}

/** Ligar itens da coluna esquerda aos da direita. Resposta em `${id}_${leftId}` = rightId */
export interface MatchingQuestion {
  id: string;
  type: 'matching';
  number?: number;
  question: string;
  left: Array<{ id: string; label?: string; icon?: string; imageSrc?: string }>;
  right: Array<{ id: string; label: string; imageSrc?: string }>;
  correct?: { [leftId: string]: string };
}

/**
 * Completar o nome de figuras com a primeira letra.
 * Resposta da letra em `${id}_${itemId}`. Subperguntas de texto em `${id}_${letter}`.
 */
export interface ImageWordCompleteQuestion {
  id: string;
  type: 'image-word-complete';
  number?: number;
  question: string;
  items: Array<{
    id: string;
    icon?: string;
    /** Caminho da imagem real (opcional, tem prioridade sobre o emoji `icon`) */
    imageSrc?: string;
    /** Restante da palavra após a primeira letra (ex.: "ONECA" para BONECA) */
    rest: string;
    correctLetter?: string;
  }>;
  subQuestions?: Array<{
    letter: string;
    question: string;
    placeholder?: string;
    correctAnswer?: string;
  }>;
}

/**
 * Trilha do alfabeto: mostra A–Z; algumas letras são lacunas para preencher.
 * Resposta de cada lacuna em `${id}_${letter}`.
 */
export interface AlphabetTrailQuestion {
  id: string;
  type: 'alphabet-trail';
  number?: number;
  question: string;
  /** Letras (maiúsculas) que devem aparecer como lacunas para o aluno preencher */
  blanks: string[];
  /** Ilustração decorativa no canto superior (ex.: a menina) */
  startImage?: string;
  /** Ilustração decorativa no canto inferior (ex.: a casa) */
  endImage?: string;
  /** Texto adicional exibido na resposta (visão do professor) */
  answerNote?: string;
}

/**
 * Lista de ícones/imagens, cada um com uma linha para o aluno escrever o significado.
 * Resposta de cada item em `${id}_${itemId}`.
 */
export interface IconDescribeQuestion {
  id: string;
  type: 'icon-describe';
  number?: number;
  question: string;
  items: Array<{
    id: string;
    /** Emoji exibido no quadradinho (usado se não houver imageSrc) */
    icon?: string;
    /** Caminho da imagem real do símbolo (opcional) */
    imageSrc?: string;
    placeholder?: string;
    correctAnswer?: string;
  }>;
}

/**
 * Quadrinha/parlenda interativa com duas ferramentas:
 * - "Pintar versos": clicar em um verso pinta a linha inteira (cicla pela paleta). Útil para contar versos.
 *   Resposta por verso em `${id}_v${verseIndex}` = cor (hex).
 * - "Circular palavras": clicar em uma palavra alterna um círculo ao redor dela (ex.: palavras que rimam).
 *   Resposta por palavra em `${id}_c${verseIndex}_${wordIndex}` = '1'.
 */
export interface QuadrinhaQuestion {
  id: string;
  type: 'quadrinha';
  number?: number;
  question: string;
  /** Oculta o enunciado do componente (útil quando o texto já está no contexto) */
  hidePrompt?: boolean;
  /** Versos da quadrinha; cada verso é dividido em palavras por espaço */
  verses: string[];
  /** Paleta usada para pintar cada verso */
  palette?: string[];
  /** Palavras que rimam (para o gabarito da visão do professor) */
  rhymes?: string[];
  /** Se true, a questão não aparece no painel "Para o professor" */
  hideFromTeacher?: boolean;
}

export type Question =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | AlternativeQuestion
  | TextInputQuestion
  | TableFillQuestion
  | FillBlanksQuestion
  | OrderingQuestion
  | DrawingQuestion
  | WordPaintQuestion
  | MatchingQuestion
  | ImageWordCompleteQuestion
  | AlphabetTrailQuestion
  | IconDescribeQuestion
  | QuadrinhaQuestion;

export interface UserAnswers {
  [questionId: string]: string | number | boolean;
}

export interface QuestionResult {
  questionId: string;
  userAnswer: string | number | boolean | undefined;
  correctAnswer: string | number | boolean;
  isCorrect: boolean;
}
