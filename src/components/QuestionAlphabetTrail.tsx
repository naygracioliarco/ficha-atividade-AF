import { AlphabetTrailQuestion, UserAnswers } from '../types/questions';
import { QuestionNumber } from './shared/QuestionNumber';
import { publicUrl } from '../lib/publicUrl';

interface QuestionAlphabetTrailProps {
  question: AlphabetTrailQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: string) => void;
  showResults?: boolean;
}

/**
 * Caminho sinuoso (serpente) das letras, como no livro impresso.
 * Cada letra tem posição fixa numa grade de 6 colunas: a linha 1 vai da esquerda
 * para a direita, a linha 3 volta da direita para a esquerda, e assim por diante,
 * com as "pedrinhas de canto" (G, N, U) ligando uma linha à outra.
 */
const TRAIL: Array<{ letter: string; row: number; col: number }> = [
  { letter: 'A', row: 1, col: 1 },
  { letter: 'B', row: 1, col: 2 },
  { letter: 'C', row: 1, col: 3 },
  { letter: 'D', row: 1, col: 4 },
  { letter: 'E', row: 1, col: 5 },
  { letter: 'F', row: 1, col: 6 },
  { letter: 'G', row: 2, col: 6 },
  { letter: 'H', row: 3, col: 6 },
  { letter: 'I', row: 3, col: 5 },
  { letter: 'J', row: 3, col: 4 },
  { letter: 'K', row: 3, col: 3 },
  { letter: 'L', row: 3, col: 2 },
  { letter: 'M', row: 3, col: 1 },
  { letter: 'N', row: 4, col: 1 },
  { letter: 'O', row: 5, col: 1 },
  { letter: 'P', row: 5, col: 2 },
  { letter: 'Q', row: 5, col: 3 },
  { letter: 'R', row: 5, col: 4 },
  { letter: 'S', row: 5, col: 5 },
  { letter: 'T', row: 5, col: 6 },
  { letter: 'U', row: 6, col: 6 },
  { letter: 'V', row: 7, col: 6 },
  { letter: 'W', row: 7, col: 5 },
  { letter: 'X', row: 7, col: 4 },
  { letter: 'Y', row: 7, col: 3 },
  { letter: 'Z', row: 7, col: 2 },
];

const STONE_RADII = [
  '46% 54% 50% 50% / 55% 45% 55% 45%',
  '52% 48% 46% 54% / 45% 55% 48% 52%',
  '50% 50% 54% 46% / 52% 48% 50% 50%',
];

function QuestionAlphabetTrail({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionAlphabetTrailProps) {
  const blanks = new Set(question.blanks.map((b) => b.toUpperCase()));

  return (
    <div className="mb-6">
      <p className="mb-4">
        <QuestionNumber number={question.number} />
        <span style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: question.question }} />
      </p>

      <div className="relative overflow-x-auto rounded-[20px] bg-gradient-to-b from-[#70c16d] to-[#70c16d] p-4 md:p-6">
        {question.startImage && (
          <img
            src={publicUrl(question.startImage)}
            alt=""
            className="pointer-events-none absolute left-3 top-3 z-10 w-16 md:w-20"
          />
        )}
        {question.endImage && (
          <img
            src={publicUrl(question.endImage)}
            alt=""
            className="pointer-events-none absolute bottom-3 left-3 z-10 w-20 md:w-24"
          />
        )}

        <div
          className="mx-auto grid w-max gap-2 md:gap-3"
          style={{
            gridTemplateColumns: 'repeat(6, 3rem)',
            gridTemplateRows: 'repeat(7, 3rem)',
          }}
        >
          {TRAIL.map(({ letter, row, col }, index) => {
            const borderRadius = STONE_RADII[index % STONE_RADII.length];
            const isBlank = blanks.has(letter);
            const stoneStyle = {
              gridColumn: col,
              gridRow: row,
              borderRadius,
            } as const;

            if (!isBlank) {
              return (
                <div
                  key={letter}
                  style={stoneStyle}
                  className="flex h-12 w-12 items-center justify-center bg-[#EEF1F4] text-xl font-bold text-black shadow-[inset_0_-2px_4px_rgba(0,0,0,0.08),0_2px_3px_rgba(0,0,0,0.15)] ring-1 ring-white/70"
                >
                  {letter}
                </div>
              );
            }

            const fieldId = `${question.id}_${letter}`;
            const typed = (userAnswers[fieldId] as string) || '';
            const value = showResults ? letter : typed;
            return (
              <div
                key={letter}
                style={stoneStyle}
                className="flex h-12 w-12 items-center justify-center border-2 border-dashed border-[#80298F] bg-[#F7F8FA] shadow-[inset_0_-2px_4px_rgba(0,0,0,0.08),0_2px_3px_rgba(0,0,0,0.15)]"
              >
                <input
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => onAnswerChange(fieldId, e.target.value.toUpperCase())}
                  disabled={showResults}
                  className="h-full w-full bg-transparent text-center text-xl font-bold uppercase text-[#80298F] focus:outline-none"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default QuestionAlphabetTrail;
