import { ReactNode } from 'react';
import { Question } from '../types/questions';
import { publicUrl } from '../lib/publicUrl';

interface TeacherAnswersProps {
  questions: Array<Question | undefined>;
}

function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || '').replace(/\s+/g, ' ').trim();
}

/** Monta o gabarito de uma questão de acordo com o tipo. */
function renderAnswer(question: Question): ReactNode {
  switch (question.type) {
    case 'text-input': {
      if (question.subQuestions?.length) {
        return (
          <ul className="list-disc pl-5">
            {question.subQuestions.map((sub) => (
              <li key={sub.letter}>
                <strong>{sub.letter})</strong> {sub.correctAnswer || '(resposta pessoal)'}
              </li>
            ))}
          </ul>
        );
      }
      return question.correctAnswer || '(resposta pessoal)';
    }
    case 'alternative':
      return question.options[question.correctAnswer];
    case 'multiple-choice':
      return `${question.correctAnswer.toUpperCase()}) ${stripHtml(question.options[question.correctAnswer] ?? '')}`;
    case 'true-false':
      return (
        <ul className="list-disc pl-5">
          {question.statements?.map((st) => (
            <li key={st.letter}>
              <strong>{st.letter})</strong> {st.correctAnswer ? 'Verdadeiro' : 'Falso'}
              {st.correction ? ` — ${stripHtml(st.correction)}` : ''}
            </li>
          ))}
        </ul>
      );
    case 'fill-blanks':
      return (
        <ul className="list-disc pl-5">
          {question.items.map((item) => (
            <li key={item.letter}>
              <strong>{item.letter})</strong> {(item.correctAnswers || []).join(', ')}
            </li>
          ))}
        </ul>
      );
    case 'ordering':
      return (
        <ol className="list-decimal pl-5">
          {[...question.items]
            .sort((a, b) => a.correctOrder - b.correctOrder)
            .map((it) => (
              <li key={it.id}>{stripHtml(it.text)}</li>
            ))}
        </ol>
      );
    case 'word-paint':
      if (question.correctGroups) {
        return (
          <ul className="list-disc pl-5">
            {question.correctGroups.map((group, gi) => (
              <li key={gi}>{group.map((i) => question.words[i]).join(' e ')}</li>
            ))}
          </ul>
        );
      }
      if (question.correctIndexes) {
        return question.correctIndexes.map((i) => question.words[i]).join(', ');
      }
      return '(resposta pessoal)';
    case 'matching':
      return (
        <ul className="space-y-1">
          {question.left.map((l) => {
            const rightId = question.correct?.[l.id];
            const right = question.right.find((r) => r.id === rightId)?.label || '—';
            return (
              <li key={l.id} className="flex items-center gap-2">
                {l.imageSrc && (
                  <img src={publicUrl(l.imageSrc)} alt="" className="h-8 w-8 object-contain" />
                )}
                {l.icon && <span className="text-xl">{l.icon}</span>}
                {l.label && <span>{l.label}</span>}
                <span>→ {right}</span>
              </li>
            );
          })}
        </ul>
      );
    case 'image-word-complete':
      return (
        <>
          <p>
            {question.items
              .map((it) => `${it.correctLetter || '_'}${it.rest}`)
              .join(', ')}
          </p>
          {question.subQuestions?.length ? (
            <ul className="mt-1 list-disc pl-5">
              {question.subQuestions.map((sub) => (
                <li key={sub.letter}>
                  <strong>{sub.letter})</strong> {sub.correctAnswer || '(resposta pessoal)'}
                </li>
              ))}
            </ul>
          ) : null}
        </>
      );
    case 'alphabet-trail':
      return (
        <>
          <p>Letras que faltam: {question.blanks.join(', ')}</p>
          {question.answerNote && <p className="mt-1">{question.answerNote}</p>}
        </>
      );
    case 'icon-describe':
      return (
        <ul className="list-disc pl-5">
          {question.items.map((item) => (
            <li key={item.id}>
              {item.icon ? `${item.icon} ` : ''}
              {item.correctAnswer || '(resposta pessoal)'}
            </li>
          ))}
        </ul>
      );
    case 'table-fill': {
      const answers = question.correctAnswer || {};
      return (
        <ul className="list-disc pl-5">
          {question.rows.map((row) => {
            const label = (row.paragraph as string) || row.id;
            const values = question.columns
              .slice(1)
              .map((_, ci) => answers[`${question.id}_${row.id}_col${ci + 1}`])
              .filter(Boolean)
              .join(' | ');
            return (
              <li key={row.id}>
                {label}: {values || '(resposta pessoal)'}
              </li>
            );
          })}
        </ul>
      );
    }
    case 'quadrinha':
      return question.rhymes && question.rhymes.length > 0
        ? `Palavras que rimam: ${question.rhymes.join(', ')}`
        : '(resposta pessoal)';
    case 'drawing':
      return question.correctAnswer || '(resposta pessoal — desenho)';
    default:
      return null;
  }
}

/** Lista o gabarito de várias questões, exibida dentro do painel "Para o professor". */
export function TeacherAnswers({ questions }: TeacherAnswersProps) {
  const valid = questions.filter(
    (q): q is Question => Boolean(q) && !('hideFromTeacher' in q! && q!.hideFromTeacher)
  );

  return (
    <div className="space-y-3">
      {valid.map((question) => {
        const number =
          'number' in question && question.number !== undefined ? `${question.number}. ` : '';
        return (
          <div key={question.id}>
            <p
              className="text-sm font-semibold text-[#80298F]"
              dangerouslySetInnerHTML={{ __html: number + question.question }}
            />
            <div className="mt-1 text-sm text-black">{renderAnswer(question)}</div>
          </div>
        );
      })}
    </div>
  );
}

export default TeacherAnswers;
