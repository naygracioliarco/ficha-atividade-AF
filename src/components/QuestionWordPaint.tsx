import { WordPaintQuestion, UserAnswers } from '../types/questions';
import { QuestionNumber } from './shared/QuestionNumber';

interface QuestionWordPaintProps {
  question: WordPaintQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: string) => void;
  showResults?: boolean;
}

const DEFAULT_PALETTE = ['#F4C2FF'];

function QuestionWordPaint({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionWordPaintProps) {
  const palette = question.palette && question.palette.length > 0 ? question.palette : DEFAULT_PALETTE;
  const isSingleColor = palette.length === 1;

  const handleClick = (index: number) => {
    if (showResults) return;
    const fieldId = `${question.id}_${index}`;
    const current = (userAnswers[fieldId] as string) || '';

    if (isSingleColor) {
      onAnswerChange(fieldId, current ? '' : palette[0]);
      return;
    }
    // Múltiplas cores: cicla pela paleta (e volta para "sem cor")
    const currentPos = palette.indexOf(current);
    const nextPos = currentPos + 1; // -1 -> 0, último -> length (sem cor)
    const nextColor = nextPos >= palette.length ? '' : palette[nextPos];
    onAnswerChange(fieldId, nextColor);
  };

  const isLines = question.layout === 'lines';

  return (
    <div className={isLines ? '' : 'mb-6'}>
      {!question.hidePrompt && (
        <p className="mb-4">
          <QuestionNumber number={question.number} />
          <span style={{ color: 'black' }} dangerouslySetInnerHTML={{ __html: question.question }} />
        </p>
      )}

      {!isSingleColor && !showResults && !isLines && (
        <p className="mb-3 text-xs text-gray-600">
          Toque em uma palavra várias vezes para trocar a cor. Use a mesma cor para as que combinam.
        </p>
      )}

      {isLines ? (
        <div className="space-y-1">
          {question.words.map((word, index) => {
            const fieldId = `${question.id}_${index}`;
            const painted = (userAnswers[fieldId] as string) || '';
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleClick(index)}
                disabled={showResults}
                className={`block w-full rounded-md px-3 py-1 text-center transition-colors ${
                  question.cursiveIndexes?.includes(index) ? 'font-cursiva' : ''
                }`}
                style={{ backgroundColor: painted || 'transparent', color: 'inherit', cursor: showResults ? 'default' : 'pointer' }}
              >
                {word}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {question.words.map((word, index) => {
            const fieldId = `${question.id}_${index}`;
            const painted = (userAnswers[fieldId] as string) || '';
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleClick(index)}
                disabled={showResults}
                className={`rounded-[10px] border-2 px-4 py-2 text-base font-semibold transition-colors ${
                  question.cursiveIndexes?.includes(index) ? 'font-cursiva' : ''
                }`}
                style={{
                  borderColor: '#80298F',
                  backgroundColor: painted || 'white',
                  color: '#000',
                }}
              >
                {word}
              </button>
            );
          })}
        </div>
      )}

      {showResults && question.correctIndexes && (
        <p className="mt-3 text-sm text-gray-600">
          Corretas:{' '}
          <strong>{question.correctIndexes.map((i) => question.words[i]).join(', ')}</strong>
        </p>
      )}

      {showResults && question.correctGroups && (
        <div className="mt-3 text-sm text-gray-600">
          <p className="mb-1 font-semibold text-gray-700">Grupos que rimam (mesma cor):</p>
          <ul className="list-disc pl-5">
            {question.correctGroups.map((group, gi) => (
              <li key={gi}>{group.map((i) => question.words[i]).join(' e ')}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default QuestionWordPaint;
