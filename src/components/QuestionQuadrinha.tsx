import { useState } from 'react';
import { QuadrinhaQuestion, UserAnswers } from '../types/questions';
import { QuestionNumber } from './shared/QuestionNumber';

interface QuestionQuadrinhaProps {
  question: QuadrinhaQuestion;
  userAnswers: UserAnswers;
  onAnswerChange: (questionId: string, answer: string) => void;
  showResults?: boolean;
}

const DEFAULT_PALETTE = ['#FBC7D4', '#B5E7C8', '#C7D7FB', '#FDE9A9', '#E5C7EC', '#FFD3B6'];

type Tool = 'paint' | 'circle';

function QuestionQuadrinha({
  question,
  userAnswers,
  onAnswerChange,
  showResults = false,
}: QuestionQuadrinhaProps) {
  const palette =
    question.palette && question.palette.length > 0 ? question.palette : DEFAULT_PALETTE;
  const [tool, setTool] = useState<Tool>('paint');

  const value = (key: string) => (userAnswers[key] as string) || '';

  const paintVerse = (vi: number) => {
    const key = `${question.id}_v${vi}`;
    const current = value(key);
    const pos = palette.indexOf(current);
    const next = pos + 1;
    onAnswerChange(key, next >= palette.length ? '' : palette[next]);
  };

  const toggleCircle = (vi: number, wi: number) => {
    const key = `${question.id}_c${vi}_${wi}`;
    onAnswerChange(key, value(key) === '1' ? '' : '1');
  };

  const onWordClick = (vi: number, wi: number) => {
    if (showResults) return;
    if (tool === 'paint') paintVerse(vi);
    else toggleCircle(vi, wi);
  };

  const clearAll = () => {
    question.verses.forEach((verse, vi) => {
      onAnswerChange(`${question.id}_v${vi}`, '');
      verse.split(' ').forEach((_, wi) => {
        onAnswerChange(`${question.id}_c${vi}_${wi}`, '');
      });
    });
  };

  const hasAnswers = question.verses.some(
    (verse, vi) =>
      value(`${question.id}_v${vi}`) !== '' ||
      verse.split(' ').some((_, wi) => value(`${question.id}_c${vi}_${wi}`) === '1')
  );

  const toolBtn = (t: Tool, label: string) => (
    <button
      type="button"
      onClick={() => setTool(t)}
      className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
        tool === t
          ? 'border-[#80298F] bg-[#80298F] text-white'
          : 'border-[#80298F]/40 bg-white text-[#80298F]'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div>
      {!question.hidePrompt && (
        <p className="mb-4 normal-case">
          <QuestionNumber number={question.number} />
          <span
            style={{ color: 'black' }}
            dangerouslySetInnerHTML={{ __html: question.question }}
          />
        </p>
      )}

      {!showResults && (
        <div className="mb-3 flex flex-wrap items-center justify-center gap-2 normal-case">
          {toolBtn('paint', 'Pintar versos')}
          {toolBtn('circle', 'Circular palavras')}
          <button
            type="button"
            onClick={clearAll}
            disabled={!hasAnswers}
            className="rounded-full border border-gray-300 bg-white px-3 py-1 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Limpar
          </button>
        </div>
      )}

      <div className="space-y-1">
        {question.verses.map((verse, vi) => {
          const verseColor = value(`${question.id}_v${vi}`);
          const words = verse.split(' ');
          return (
            <div
              key={vi}
              className="rounded-md px-2 py-1"
              style={{ backgroundColor: verseColor || 'transparent' }}
            >
              {words.map((word, wi) => {
                const circled = value(`${question.id}_c${vi}_${wi}`) === '1';
                return (
                  <button
                    key={wi}
                    type="button"
                    onClick={() => onWordClick(vi, wi)}
                    disabled={showResults}
                    className={`mx-0.5 my-0.5 inline-block leading-snug transition-colors ${
                      circled
                        ? 'rounded-full border-2 border-[rgb(109_38_17)] px-2 text-[rgb(109_38_17)]'
                        : 'px-0.5'
                    }`}
                    style={{ cursor: showResults ? 'default' : 'pointer' }}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {!showResults && (
        <p className="mt-3 text-center text-[11px] normal-case text-[#7A6A97]">
          {tool === 'paint'
            ? 'Toque em cada verso para pintá-lo de uma cor diferente e contar quantos são.'
            : 'Toque nas palavras que rimam para circulá-las.'}
        </p>
      )}

      {showResults && question.rhymes && question.rhymes.length > 0 && (
        <p className="mt-3 text-sm normal-case text-gray-600">
          Palavras que rimam: <strong>{question.rhymes.join(', ')}</strong>
        </p>
      )}
    </div>
  );
}

export default QuestionQuadrinha;
